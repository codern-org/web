import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/common/collapsible';
import { classNames, compactNumber } from '@/libs/utils';
import {
  SubmissionResultStatus,
  SubmissionResult as SubmissionResultType,
  SubmissionStatusDetail,
  Submission as SubmissionType,
} from '@/types/workspace-type';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import { ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';

// TODO: NEED REFACTOR, GARBAGE CODE HERE !!!

export type SubmissionProps = {
  defaultOpen?: boolean;
  index: number;
  submission: SubmissionType;
};

export const Submission = ({ defaultOpen, index, submission }: SubmissionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { results } = submission;
  const isGrading = results.some((result) => result.status === SubmissionResultStatus.GRADING);
  const isMissingResult = results.length === 0;
  const isError =
    (!isGrading && results.some((result) => result.status !== SubmissionResultStatus.DONE)) ||
    isMissingResult;
  const isCompleteWithoutError = !isGrading && !isError;

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
              {dayjs(submission.submittedAt).format('DD/MM/YY hh:mm:ss A')}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="flex items-center space-x-2 rounded-md border px-2">
            <span
              className={classNames(
                'h-2 w-2 rounded-full',
                isGrading && 'bg-yellow-500',
                isError && 'bg-red-500',
                isCompleteWithoutError && 'bg-green-500',
              )}
            />
            <span className="text-sm text-secondary-foreground">
              {isCompleteWithoutError ? 'Done' : isGrading ? 'Grading' : 'Error'}
            </span>
          </div>
          <ChevronDownIcon
            className={classNames(
              'h-4 w-4 text-secondary-foreground',
              isOpen && 'rotate-180 transform',
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-3">
        <SubmissionResult submission={submission} />
        <p className="mt-2 text-xs text-muted-foreground">Submission id: {submission.id}</p>
      </CollapsibleContent>
    </Collapsible>
  );
};

const RESULT_TEXT_MAP = {
  [SubmissionStatusDetail.COMPLETED]: 'Passed',

  [SubmissionStatusDetail.FAIL_COMPILATION]: 'Compilation Error',
  [SubmissionStatusDetail.FAIL_TIMEOUT]: 'Execution Timeout',
  [SubmissionStatusDetail.FAIL_TIMEOUT_HARD]: 'Error',
  [SubmissionStatusDetail.FAIL_MEMORY]: 'Memory Exceed',

  [SubmissionStatusDetail.SYSTEM_FAIL]: 'Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_MISSING_IMAGE]: 'Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_FETCH_FILE]: 'Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_CONTAINER]: 'Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_CONTAINER_PING]: 'Error',
  [SubmissionStatusDetail.SYSTEM_FAIL_RETRY_EXCEED]: 'Error',

  [SubmissionStatusDetail.UNKNOWN]: 'Error',
};
const translateResult = (result: SubmissionResultType) => {
  return result.status == SubmissionResultStatus.DONE
    ? 'Passed'
    : RESULT_TEXT_MAP[result.statusDetail as keyof typeof RESULT_TEXT_MAP] || 'Failed';
};

type SubmissionResultProps = {
  submission: SubmissionType;
};

const SubmissionResult = ({ submission }: SubmissionResultProps) => {
  const { results } = submission;
  const isGrading = results.some((result) => result.status === 'GRADING');

  if (isGrading) {
    const completedCount = results.filter((result) => result.status !== 'GRADING').length;
    return (
      <div className="flex flex-row items-center space-x-2 py-2 text-sm text-secondary-foreground">
        <Loader2Icon className="h-4 w-4 animate-spin " />
        <p className="animate-pulse">
          Grading... {completedCount}/{results.length}
        </p>
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
          {RESULT_TEXT_MAP[SubmissionStatusDetail.FAIL_COMPILATION]}
        </div>
        <pre
          dangerouslySetInnerHTML={{
            __html: lines.join('\n'),
          }}
          className="mb-1 whitespace-pre-wrap rounded-md border p-2 text-xs text-muted-foreground"
        />
      </>
    );
  }

  return results.map((result, index) => (
    <div
      key={index}
      className="flex flex-row space-x-2 font-mono text-xs"
    >
      <span className="text-secondary-foreground">Case {index + 1}</span>
      <span
        className={classNames(
          'capitalize',
          result.status === 'DONE' && 'text-green-500',
          result.status === 'ERROR' && 'text-danger',
        )}
      >
        {translateResult(result)}
      </span>

      <span className="text-muted-foreground">
        ({compactNumber(result.memoryUsage || 0)} MB, {compactNumber(result.timeUsage || 0)} ms)
      </span>
    </div>
  ));
};
