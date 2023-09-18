import { Submission as SubmissionComponent } from '@/components/features/workspace/assignment/submission';
import { useListSubmissionQuery } from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export const SubmissionList = () => {
  const { workspaceId, assignmentId } = useParams();
  const { data: submissions } = useListSubmissionQuery(Number(workspaceId), Number(assignmentId));

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
            id={submission.id}
            language={submission.language}
            results={submission.results}
            submittedAt={submission.submittedAt}
          />
        ))}
    </div>
  );
};
