import { Badge } from '@/components/common/badge';
import { Separator } from '@/components/common/separator';
import { AssignmentHeaderSkeleton } from '@/components/features/workspace/assignment/header-skeleton';
import { useGetAssignmentQuery } from '@/hooks/workspace-hook';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

export const AssignmentHeader = () => {
  const { workspaceId, assignmentId } = useParams();
  const { data: assignment } = useGetAssignmentQuery(Number(workspaceId), Number(assignmentId));

  if (!assignment) return <AssignmentHeaderSkeleton />;

  return (
    <div className="container flex flex-row items-center justify-between py-6">
      <div className="flex flex-col space-y-0.5">
        <div className="flex flex-row items-center space-x-2">
          <h2 className="text-lg font-semibold">{assignment.name}</h2>
          <div className="flex flex-row space-x-2">
            <Badge variant="outline">{assignment.level}</Badge>
            <Separator
              orientation="vertical"
              className="h-5"
            />
            <Badge variant="secondary">Memory Limit: {assignment.memoryLimit} KB</Badge>
            <Badge variant="secondary">Time Limit: {assignment.timeLimit} ms</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{assignment.description}</p>
      </div>
      <p className="text-sm">
        Due date {dayjs(assignment.createdAt).format('ddd, DD MMM YYYY hh:mm:ss A')}
      </p>
    </div>
  );
};
