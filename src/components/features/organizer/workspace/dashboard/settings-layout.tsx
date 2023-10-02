import { buttonVariants } from '@/components/common/button';
import { Separator } from '@/components/common/separator';
import { OrganizerWorkspaceSettingsTab, RoutePath } from '@/libs/constants';
import { classNames } from '@/libs/utils';
import { LucideIcon, SettingsIcon, UsersIcon } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

const sidebarNavItems: SidebarNavItem[] = [
  {
    icon: SettingsIcon,
    title: 'General',
    tab: OrganizerWorkspaceSettingsTab.GENERAL,
  },
  {
    icon: UsersIcon,
    title: 'Admin',
    tab: OrganizerWorkspaceSettingsTab.ADMIN,
  },
];

export const OrganizerWorkspaceSettings = () => {
  const { workspaceId, settings } = useParams();

  if (!settings) {
    // TODO: refactor hardcoded redirect path
    return <Navigate to={'./settings/' + OrganizerWorkspaceSettingsTab.GENERAL} />;
  }

  return (
    <div className="rounded-md border p-10 shadow">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="text-muted-foreground">Manage your workspace settings</p>
      <Separator className="my-6" />
      <div className="flex flex-col lg:flex-row">
        <aside className="w-1/5">
          <SidebarNav
            items={sidebarNavItems}
            workspaceId={Number(workspaceId)}
          />
        </aside>
        <div className="flex"></div>
      </div>
    </div>
  );
};

type SidebarNavItem = {
  icon: LucideIcon;
  tab: OrganizerWorkspaceSettingsTab;
  title: string;
};

type SidebarNavProps = HTMLAttributes<HTMLElement> & {
  items: SidebarNavItem[];
  workspaceId: number;
};

const SidebarNav = ({ className, items, workspaceId, ...props }: SidebarNavProps) => {
  const location = useLocation();
  return (
    <nav
      className={classNames('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
      {...props}
    >
      {items.map((item) => {
        const pathname = RoutePath.ORGANIZER_WORKSPACCE_SETTINGS.replace(
          ':workspaceId',
          workspaceId.toString(),
        );
        const href = pathname.replace(':settings', item.tab.toString());

        return (
          <Link
            key={item.tab}
            to={href}
            className={classNames(
              buttonVariants({ variant: 'ghost' }),
              href === location.pathname ? 'bg-muted hover:bg-muted' : 'hover:bg-muted',
              'items-center justify-start space-x-1',
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};
