import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { AssignmentsTable } from '@/components/features/workspace/dashboard/assignment-table';

export const WorkspaceContent = () => {
  return (
    <Tabs
      defaultValue="assignments"
      className="space-y-6"
    >
      <TabsList>
        <TabsTrigger value="assignments">Assignments</TabsTrigger>
        <TabsTrigger value="scoreboard">Scoreboard</TabsTrigger>
      </TabsList>
      <TabsContent value="assignments">
        <AssignmentsTable />
      </TabsContent>
      <TabsContent value="scoreboard"></TabsContent>
    </Tabs>
  );
};
