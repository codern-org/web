import { Badge } from '@/components/common/badge';
import { Separator } from '@/components/common/separator';
import { Skeleton } from '@/components/common/skeleton';
import { AssignmentBreadcrumb } from '@/components/features/workspace/assignment/breadcrumb';
import { useGetAssignmentQuery } from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export const AssignmentHeader = () => {
  const { workspaceId, assignmentId } = useParams();
  const { data: assignment } = useGetAssignmentQuery(Number(workspaceId), Number(assignmentId));

  return (
    <div className="container flex flex-col">
      <AssignmentBreadcrumb className="py-6" />

      <div className="flex flex-col space-y-0.5">
        <div className="flex flex-row items-center space-x-2">
          {assignment ? (
            <h2 className="text-lg font-semibold">{assignment.name}</h2>
          ) : (
            <Skeleton className="h-7 w-32" />
          )}
          <div className="flex flex-row space-x-2">
            {assignment ? (
              <Badge
                variant="outline"
                className="bg-background"
              >
                {assignment.level}
              </Badge>
            ) : (
              <Skeleton className="h-[21px] w-24" />
            )}

            <Separator
              orientation="vertical"
              className="h-5"
            />

            {assignment ? (
              <Badge variant="secondary">Memory Limit: {assignment.memoryLimit} KB</Badge>
            ) : (
              <Skeleton className="h-[21px] w-24" />
            )}
            {assignment ? (
              <Badge variant="secondary">Time Limit: {assignment.timeLimit} ms</Badge>
            ) : (
              <Skeleton className="h-[21px] w-24" />
            )}
          </div>
        </div>
        {assignment ? (
          <p className="text-sm text-muted-foreground">{assignment.description}</p>
        ) : (
          <Skeleton className="h-5 w-64" />
        )}
      </div>
    </div>
  );
};
