import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@/components/common/breadcrumb';
import { Skeleton } from '@/components/common/skeleton';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';
import { useParams } from 'react-router-dom';

export const WorkspaceBreadcrumb = (props: BreadcrumbProps) => {
  const { workspaceId } = useParams();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));

  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink href={RoutePath.DASHBOARD}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        {workspace ? (
          <BreadcrumbLink>{workspace.name}</BreadcrumbLink>
        ) : (
          <Skeleton className="h-5 w-24" />
        )}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
