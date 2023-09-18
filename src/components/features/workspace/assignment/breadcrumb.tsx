import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@/components/common/breadcrumb';
import { Skeleton } from '@/components/common/skeleton';
import { useGetAssignmentQuery, useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export type AssignmentBreadcrumbProps = BreadcrumbProps;

export const AssignmentBreadcrumb = ({ ...props }: AssignmentBreadcrumbProps) => {
  const { workspaceId, assignmentId } = useParams();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));
  const { data: assignment } = useGetAssignmentQuery(Number(workspaceId), Number(assignmentId));

  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        {workspace ? (
          <BreadcrumbLink href={`/dashboard/workspace/${workspace.id}`}>
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
