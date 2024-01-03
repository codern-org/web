import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/common/collapsible';
import { Separator } from '@/components/common/separator';
import { SubmissionCodeView } from '@/components/features/assignment/submission-code-view';
import { classNames, compactNumber, formatDate } from '@/libs/utils';
import {
  AssignmentStatus,
  SubmissionStatusDetail,
  Submission as SubmissionType,
} from '@/types/workspace-type';
import DOMPurify from 'dompurify';
import { ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';

const ERROR_MESSAGE_MAP = {
  [SubmissionStatusDetail.FAIL_COMPILATION]: 'Compilation Error',
  [SubmissionStatusDetail.FAIL_TIMEOUT]: 'Execution Timeout',
  [SubmissionStatusDetail.FAIL_TIMEOUT_HARD]: 'Execution Timeout',
  [SubmissionStatusDetail.FAIL_MEMORY]: 'Memory Exceed',

  [SubmissionStatusDetail.SYSTEM_FAIL]: 'System Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_MISSING_IMAGE]: 'System Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_FETCH_FILE]: 'System Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_CONTAINER]: 'System Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_CONTAINER_PING]: 'System Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_RETRY_EXCEED]: 'System Error',

  [SubmissionStatusDetail.UNKNOWN]: 'System Error',
};

export type SubmissionProps = {
  defaultOpen?: boolean;
  index: number;
  submission: SubmissionType;
};

export const Submission = ({ defaultOpen, index, submission }: SubmissionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger className="flex w-full flex-row items-center justify-between rounded-md border px-4 py-2">
        <div className="flex flex-row items-center space-x-4">
          <h4 className="text-sm text-muted-foreground">{index + 1}</h4>
          <div className="flex flex-col items-start">
            <p className="text-sm">Language: {submission.language}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(submission.submittedAt, 'd MMM yy pp')}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <SubmissionStatusBadge status={submission.status} />
          <ChevronDownIcon
            className={classNames(
              'h-4 w-4 text-secondary-foreground',
              isOpen && 'rotate-180 transform',
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded-md border px-4 py-3">
        <SubmissionResults submission={submission} />
        <Separator className="my-3" />
        <div className="flex flex-col justify-between space-y-2 text-xs xl:flex-row xl:items-center xl:space-y-0">
          <p className="text-muted-foreground xl:mb-0">Submission id: {submission.id.toString()}</p>
          <SubmissionCodeView submission={submission} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export type SubmissionStatusBadgeProps = {
  status: AssignmentStatus;
};

export const SubmissionStatusBadge = ({ status }: SubmissionStatusBadgeProps) => {
  const isGrading = status === AssignmentStatus.GRADING;
  const isIncompleted = status === AssignmentStatus.INCOMPLETED;
  const isCompleted = status === AssignmentStatus.COMPLETED;

  return (
    <div className="flex items-center space-x-2 rounded-md border px-2 font-normal">
      <span
        className={classNames(
          'h-2 w-2 rounded-full',
          isGrading && 'bg-yellow-500',
          isIncompleted && 'bg-red-500',
          isCompleted && 'bg-green-500',
        )}
      />
      <span className="text-sm text-secondary-foreground">
        {isGrading && 'Grading'}
        {isCompleted && 'Passed'}
        {isIncompleted && 'Failed'}
      </span>
    </div>
  );
};

type SubmissionResultsProps = {
  submission: SubmissionType;
};

const SubmissionResults = ({ submission }: SubmissionResultsProps) => {
  const { results } = submission;
  const isGrading = submission.status === AssignmentStatus.GRADING;

  if (isGrading) {
    return (
      <div className="flex flex-row items-center space-x-2 py-1 text-sm text-secondary-foreground">
        <Loader2Icon className="h-4 w-4 animate-spin " />
        <p className="animate-pulse">Grading</p>
      </div>
    );
  }

  if (submission.compilationLog) {
    const compilationLog = DOMPurify.sanitize(submission.compilationLog);
    const lines = compilationLog.trim().split('\n');

    const errorData = lines[0].split(':');
    const errorName = `<span class="text-yellow-500">${errorData[3]}</span>`;
    lines[0] =
      `${errorData[0]}:${errorData[1]}:${errorData[2]}:${errorName}:` +
      `<span class="text-red-500">${errorData.slice(4)}</span>`;

    return (
      <>
        <div className="mb-2 font-mono text-xs text-red-500">
          {ERROR_MESSAGE_MAP[SubmissionStatusDetail.FAIL_COMPILATION]}
        </div>
        <pre
          dangerouslySetInnerHTML={{
            __html: lines.join('\n'),
          }}
          className="whitespace-pre-wrap rounded-md border p-2 text-xs text-muted-foreground"
        />
      </>
    );
  }

  return (
    results &&
    results.map((result, index) => {
      const timeUsage = compactNumber(result.timeUsage || 0);
      const status = result.isPassed
        ? 'Correct'
        : result.status !== SubmissionStatusDetail.COMPLETED
        ? ERROR_MESSAGE_MAP[result.status]
        : 'Wrong';

      return (
        <div
          key={index}
          className="flex flex-row space-x-2 font-mono text-xs"
        >
          <span className="text-secondary-foreground">Case {index + 1}</span>
          <span
            className={classNames(
              'capitalize',
              result.isPassed ? 'text-green-500' : 'text-red-500',
            )}
          >
            {status}
          </span>

          <span className="text-muted-foreground">
            ({compactNumber(result.memoryUsage || 0)} MB,&nbsp;
            {timeUsage.includes('K') ? `${timeUsage.slice(0, -1)} s` : `${timeUsage} ms`})
          </span>
        </div>
      );
    })
  );
};
