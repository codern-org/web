import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@/components/common/breadcrumb';
import { Skeleton } from '@/components/common/skeleton';
import { useGetAssignmentQuery, useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';
import { useParams } from 'react-router-dom';

export const AssignmentBreadcrumb = (props: BreadcrumbProps) => {
  const { workspaceId, assignmentId } = useParams();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));
  const { data: assignment } = useGetAssignmentQuery(Number(workspaceId), Number(assignmentId));

  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink href={RoutePath.DASHBOARD}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        {workspace ? (
          <BreadcrumbLink href={RoutePath.FALLBACK_WORKSPACE(Number(workspaceId))}>
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
