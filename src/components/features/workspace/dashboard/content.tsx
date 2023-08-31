import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { AssignmentsTable } from '@/components/features/workspace/dashboard/assignment/table';
import { Workspace } from '@/types/workspace-type';

type WorkspaceDashboardContentProps = {
  workspace: Workspace | undefined;
};

export const WorkspaceDashboardContent = ({ workspace }: WorkspaceDashboardContentProps) => {
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
        {workspace && (
          <AssignmentsTable
            workspaceId={workspace.id}
            data={[]}
          />
        )}
      </TabsContent>
      <TabsContent value="scoreboard"></TabsContent>
    </Tabs>
  );
};
