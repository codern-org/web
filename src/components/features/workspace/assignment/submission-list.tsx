import { Submission as SubmissionComponent } from '@/components/features/workspace/assignment/submission';
import { useListSubmission } from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export const SubmissionList = () => {
  const { workspaceId, assignmentId } = useParams();
  const { submissions } = useListSubmission(Number(workspaceId), Number(assignmentId));

  if (!submissions || submissions.length === 0) {
    return <>No submissions</>;
  }

  return (
    <div className="space-y-4">
      {submissions
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
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
