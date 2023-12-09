import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@/components/common/breadcrumb';
import { Skeleton } from '@/components/common/skeleton';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetAssignmentQuery, useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';

export const AssignmentBreadcrumb = (props: BreadcrumbProps) => {
  const { workspaceId, assignmentId } = useWorkspaceParams();
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);
  const { data: assignment } = useGetAssignmentQuery(workspaceId, assignmentId);

  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink href={RoutePath.DASHBOARD}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        {workspace ? (
          <BreadcrumbLink href={RoutePath.FALLBACK_WORKSPACE(workspaceId)}>
            {workspace.name}
          </BreadcrumbLink>
        ) : (
          <Skeleton className="h-5 w-24" />
        )}
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        {assignment ? (
          <BreadcrumbLink>{assignment.name}</BreadcrumbLink>
        ) : (
          <Skeleton className="h-5 w-24" />
        )}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
