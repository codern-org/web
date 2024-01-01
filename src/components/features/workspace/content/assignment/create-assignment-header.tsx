import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/common/breadcrumb';
import { Skeleton } from '@/components/common/skeleton';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';

export const CreateAssignmentHeader = () => {
  const { workspaceId } = useWorkspaceParams();
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);

  return (
    <div className="container pt-6">
      <Breadcrumb>
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
          <BreadcrumbLink>Create assignment</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};
