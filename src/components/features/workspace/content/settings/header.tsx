import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/common/breadcrumb';
import { Image } from '@/components/common/image';
import { Skeleton } from '@/components/common/skeleton';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';
import { formatDate } from '@/libs/utils';

export const WorkspaceSettingsHeader = () => {
  const { workspaceId } = useWorkspaceParams();
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);

  return (
    <div className="border-b bg-background">
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
            <BreadcrumbLink>Settings</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex justify-between py-8">
          {workspace ? (
            <div>
              <h2 className="mb-3 text-3xl font-semibold tracking-tight">{workspace.name}</h2>
              <p className="text-sm text-muted-foreground">
                Created on {formatDate(workspace.createdAt, 'EEEE, dd MMMM yyyy')}
              </p>
            </div>
          ) : (
            <div>
              <Skeleton className="mb-3 h-9 w-48" />
              <Skeleton className="h-5 w-24" />
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Image
              src={workspace?.ownerProfileUrl}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm leading-none text-muted-foreground">Owner</p>
              <p className="text-sm font-medium">{workspace?.ownerName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
