import { Submission as SubmissionComponent } from '@/components/features/assignment/submission';
import { useListSubmission } from '@/hooks/workspace-hook';
import { XIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const SubmissionList = () => {
  const { workspaceId, assignmentId } = useParams();
  const { data: submissions } = useListSubmission(Number(workspaceId), Number(assignmentId));

  if (!submissions || submissions.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <XIcon className="mr-1 h-5 w-5" />
        No submission
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions
        .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
        .map((submission, index) => (
          <SubmissionComponent
            key={submission.id}
            index={submissions.length - index - 1}
            defaultOpen={index === 0}
            submission={submission}
          />
        ))}
    </div>
  );
};
