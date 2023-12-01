import { buttonVariants } from '@/components/common/button';
import { Separator } from '@/components/common/separator';
import { AccountProfileSettings } from '@/components/features/settings/content/profile';
import { AccountSettingsContent, RoutePath } from '@/libs/constants';
import { classNames } from '@/libs/utils';
import { LucideIcon, UserIcon } from 'lucide-react';
import { HTMLAttributes, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';

const sidebarNavItems: SidebarNavItem[] = [
  {
    icon: UserIcon,
    title: 'Profile',
    tab: AccountSettingsContent.PROFILE,
    content: <AccountProfileSettings />,
  },
];

export const AccountSettings = () => {
  const { settings } = useParams();
  const content = sidebarNavItems.find((item) => item.tab === settings)?.content;

  return (
    <div className="container py-8">
      <div className="rounded-md border bg-background p-10 shadow">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="text-muted-foreground">Manage your settings</p>
        <Separator className="my-6" />
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <aside className="w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{content}</div>
        </div>
      </div>
    </div>
  );
};

type SidebarNavItem = {
  icon: LucideIcon;
  tab: AccountSettingsContent;
  title: string;
  content: ReactNode;
};

type SidebarNavProps = HTMLAttributes<HTMLElement> & {
  items: SidebarNavItem[];
};

const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const { settings } = useParams();

  return (
    <nav
      className={classNames('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.tab}
          to={RoutePath.ACCOUNT_SETTINGS(item.tab)}
          className={classNames(
            buttonVariants({ variant: 'ghost' }),
            settings === item.tab ? 'bg-muted hover:bg-muted' : 'hover:bg-muted',
            'items-center justify-start space-x-1',
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};
