import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { AssignmentsTable } from '@/components/features/workspace/dashboard/assignment-table';
import { useGetWorkspaceQuery, useListAssignmentQuery } from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export const WorkspaceDashboardContent = () => {
  const { workspaceId } = useParams();
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));
  const { data: assignments } = useListAssignmentQuery(Number(workspaceId));

  return (
    <Tabs
      defaultValue="assignments"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="scoreboard">Scoreboard</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="assignments">
        {workspace && assignments && (
          <AssignmentsTable
            workspaceId={workspace.id}
            assignments={assignments}
          />
        )}
      </TabsContent>
      <TabsContent value="scoreboard"></TabsContent>
    </Tabs>
  );
};
