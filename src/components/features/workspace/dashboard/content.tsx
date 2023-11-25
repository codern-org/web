import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { AssignmentsTable } from '@/components/features/workspace/dashboard/assignment-table';
import { RoutePath, WorkspaceContent as WorkspaceContentEnum } from '@/libs/constants';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const WorkspaceContent = () => {
  const { workspaceId, content } = useParams();
  const navigate = useNavigate();

  const tabs = useMemo(
    () => [
      {
        value: 'assignment',
        path: RoutePath.WORKSPACE(Number(workspaceId), WorkspaceContentEnum.ASSIGNMENT),
        label: 'Assignments',
        content: <AssignmentsTable />,
      },
      {
        value: 'scoreboard',
        path: RoutePath.WORKSPACE(Number(workspaceId), WorkspaceContentEnum.SCOREBOARD),
        label: 'Scoreboard',
        content: <></>,
      },
    ],
    [workspaceId],
  );

  return (
    <Tabs
      defaultValue={content}
      className="container space-y-6 py-8"
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => navigate(tab.path)}
            children={tab.label}
          />
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
