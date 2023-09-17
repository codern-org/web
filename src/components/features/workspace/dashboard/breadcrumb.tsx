import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@/components/common/breadcrumb';
import { Skeleton } from '@/components/common/skeleton';

export type WorkspaceDashboardBreadcrumbProps = BreadcrumbProps & {
  workspaceName: string | undefined;
};

export const WorkspaceDashboardBreadcrumb = ({
  workspaceName,
  ...props
}: WorkspaceDashboardBreadcrumbProps) => {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        {workspaceName ? (
          <BreadcrumbLink>{workspaceName}</BreadcrumbLink>
        ) : (
          <Skeleton className="h-5 w-24" />
        )}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
