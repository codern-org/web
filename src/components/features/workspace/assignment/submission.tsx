import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/common/collapsible';
import { classNames } from '@/libs/utils';
import { SubmissionResult } from '@/types/workspace-type';
import dayjs from 'dayjs';
import { ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export type SubmissionProps = {
  defaultOpen?: boolean;
  index: number;
  id: number;
  language: string;
  results: SubmissionResult[];
  submittedAt: Date;
};

export const Submission = ({
  defaultOpen,
  index,
  id,
  language,
  results,
  submittedAt,
}: SubmissionProps) => {
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
            <p className="text-sm">Language: {language}</p>
            <p className="text-xs text-muted-foreground">
              {dayjs(submittedAt).format('DD/MM/YY hh:mm:ss A')}
            </p>
          </div>
        </div>
        <div>
          <ChevronDownIcon
            className={classNames(
              'h-5 w-5 text-secondary-foreground',
              isOpen && 'rotate-180 transform',
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-3">
        <SubmissionResult results={results} />
        <p className="mt-2 text-xs text-muted-foreground">Submission id: {id}</p>
      </CollapsibleContent>
    </Collapsible>
  );
};

type SubmissionResultProps = {
  results: SubmissionResult[];
};

const SubmissionResult = ({ results }: SubmissionResultProps) => {
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

  return results.map((result, index) => (
    <div
      key={index}
      className="flex flex-row space-x-2 font-mono text-xs"
    >
      <p className="text-secondary-foreground">Case {index + 1}</p>
      <p
        className={classNames(
          result.status === 'DONE' && 'text-green-500',
          result.status === 'ERROR' && 'text-danger',
        )}
      >
        {result.status}
      </p>
    </div>
  ));
};
