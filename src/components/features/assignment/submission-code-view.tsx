import { Button } from '@/components/common/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/popover';
import { Separator } from '@/components/common/separator';
import {
  SubmissionResults,
  SubmissionStatusBadge,
} from '@/components/features/assignment/submission';
import { Editor } from '@/components/features/editor/editor';
import { EditorProvider } from '@/hooks/editor-hook';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetSubmissionCode } from '@/hooks/workspace-hook';
import { formatDate } from '@/libs/utils';
import { Submission } from '@/types/workspace-type';
import { CalendarIcon, CopyIcon, EyeIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export type SubmissionCodeViewProps = {
  submission: Submission;
};

export const SubmissionCodeView = ({ submission }: SubmissionCodeViewProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copyResult, setCopyResult] = useState('');

  const { workspaceId, assignmentId } = useWorkspaceParams();
  const { data: code } = useGetSubmissionCode(
    workspaceId,
    assignmentId,
    submission.id,
    isOpen ? submission.fileUrl : undefined,
  );

  const copyToClipboard = () => {
    if (!code) return setCopyResult('Code is not load yet');
    navigator.clipboard
      .writeText(code)
      .then(() => setCopyResult('Copied'))
      .catch(() => setCopyResult('Error to copy'));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="h-6 space-x-1 px-2 py-0"
        >
          <EyeIcon className="h-4 w-4" />
          <span className="hidden lg:block">View code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-3/4 max-w-3xl flex-col">
        <DialogHeader>
          <DialogTitle className="mr-6 flex justify-between">
            <span>Submission</span>
            <SubmissionStatusBadge status={submission.status} />
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex space-x-2">
              <span>ID: {submission.id.toString()}</span>
              <Separator orientation="vertical" />
              <span className="text-sm font-normal">Language: {submission.language}</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        {submission.results && (
          <div className="h-1/4 overflow-y-scroll rounded-md border px-4 py-3">
            <div className="mb-1 text-sm">
              Testcases ({submission.results.filter((result) => result.isPassed).length}/
              {submission.results.length})
            </div>
            <SubmissionResults submission={submission} />
          </div>
        )}

        {code ? (
          <EditorProvider
            code={code}
            readOnly
          >
            <Editor />
          </EditorProvider>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader2Icon className="mr-2 animate-spin" /> Loading...
          </div>
        )}

        <DialogFooter className="h-fit sm:justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="mr-1.5 h-4 w-4" />
            Submitted at {formatDate(submission.submittedAt, 'd MMM yy pp')}
          </div>
          <Popover open={!!copyResult}>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                onClick={copyToClipboard}
              >
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy to clipboard
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="w-fit px-3 py-2 text-sm"
            >
              {copyResult}
            </PopoverContent>
          </Popover>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
