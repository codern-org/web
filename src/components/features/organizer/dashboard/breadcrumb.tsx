import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from '@/components/common/breadcrumb';

export const OrganizerDashboardBreadcrumb = (props: BreadcrumbProps) => {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
