import { Badge } from '@/components/common/badge';
import { Separator } from '@/components/common/separator';
import { Skeleton } from '@/components/common/skeleton';
import { AssignmentBreadcrumb } from '@/components/features/assignment/breadcrumb';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetAssignmentQuery } from '@/hooks/workspace-hook';
import { formatDate } from '@/libs/utils';

export const AssignmentHeader = () => {
  const { workspaceId, assignmentId } = useWorkspaceParams();
  const { data: assignment } = useGetAssignmentQuery(workspaceId, assignmentId);

  return (
    <div className="container flex flex-col">
      <AssignmentBreadcrumb className="py-6" />

      <div className="flex items-center justify-between">
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
        <div className="space-y-0.5">
          {assignment ? (
            <p className="text-sm">
              Due date: {formatDate(assignment.dueDate, 'EEE, d MMM yyyy p')}
            </p>
          ) : (
            <Skeleton className="h-5 w-64" />
          )}
          {assignment ? (
            <p className="text-xs text-muted-foreground">
              Created date: {formatDate(assignment.createdAt, 'EEE, d MMM yyyy p')}
            </p>
          ) : (
            <Skeleton className="h-5 w-64" />
          )}
        </div>
      </div>
    </div>
  );
};
