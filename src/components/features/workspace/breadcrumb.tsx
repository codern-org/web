import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@/components/common/breadcrumb';
import { Skeleton } from '@/components/common/skeleton';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';

export const WorkspaceBreadcrumb = (props: BreadcrumbProps) => {
  const { workspaceId } = useWorkspaceParams();
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);

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
