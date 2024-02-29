import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/common/breadcrumb';
import { RoutePath } from '@/libs/constants';

export const CreateWorkspaceHeader = () => {
  return (
    <div className="container pt-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href={RoutePath.DASHBOARD}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Create workspace</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};
