import { Skeleton } from '@/components/common/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { AssignmentTable } from '@/components/features/workspace/content/assignment/table';
import { WorkspaceParticipantTable } from '@/components/features/workspace/content/participant/table';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import {
  RoutePath,
  WorkspaceContent as WorkspaceContentEnum,
  WorkspaceSettingsContent,
} from '@/libs/constants';
import { WorkspaceRole } from '@/types/workspace-type';
import { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';

export type WorkspaceContentTabs = {
  value: WorkspaceContentEnum;
  path: string;
  label: string;
  content: ReactNode;
  restrictedRole: WorkspaceRole[];
};

export const WorkspaceContent = () => {
  const { workspaceId, content } = useWorkspaceParams();
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);

  const tabs = useMemo<WorkspaceContentTabs[]>(() => {
    if (!workspace) return [];
    return [
      {
        value: WorkspaceContentEnum.ASSIGNMENT,
        path: RoutePath.WORKSPACE(workspace.id, WorkspaceContentEnum.ASSIGNMENT),
        label: 'Assignment',
        content: <AssignmentTable />,
        restrictedRole: [WorkspaceRole.MEMBER, WorkspaceRole.ADMIN, WorkspaceRole.OWNER],
      },
      {
        value: WorkspaceContentEnum.PARTICIPANT,
        path: RoutePath.WORKSPACE(workspace.id, WorkspaceContentEnum.PARTICIPANT),
        label: 'Participant',
        content: <WorkspaceParticipantTable />,
        restrictedRole: [WorkspaceRole.MEMBER, WorkspaceRole.ADMIN, WorkspaceRole.OWNER],
      },
      {
        value: WorkspaceContentEnum.SETTINGS,
        path: RoutePath.WORKSPACE_SETTINGS(workspace.id, WorkspaceSettingsContent.GENERAL),
        label: 'Settings',
        content: <></>,
        restrictedRole: [WorkspaceRole.ADMIN, WorkspaceRole.OWNER],
      },
    ].filter((tab) => tab.restrictedRole.includes(workspace.role));
  }, [workspace]);

  if (!workspace) {
    return (
      <div className="container space-y-6 py-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <Tabs
      defaultValue={content}
      className="container space-y-6 py-8"
    >
      <TabsList>
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            to={tab.path}
            draggable="false"
          >
            <TabsTrigger
              value={tab.value}
              children={tab.label}
            />
          </Link>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          children={tab.content}
        />
      ))}
    </Tabs>
  );
};
