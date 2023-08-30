import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tab';
import { AssignmentsTable } from '@/components/features/workspace/dashboard/table/AssignmentsTable';

export const WorkspaceDashboardContent = () => {
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
        <AssignmentsTable data={[]} />
      </TabsContent>
      <TabsContent value="scoreboard"></TabsContent>
    </Tabs>
  );
};
