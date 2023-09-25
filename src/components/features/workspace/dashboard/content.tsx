import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { AssignmentsTable } from '@/components/features/workspace/dashboard/assignment-table';
import { useListAssignmentQuery } from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export const WorkspaceContent = () => {
  const { workspaceId } = useParams();
  const { data: assignments } = useListAssignmentQuery(Number(workspaceId));

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
        {assignments && (
          <AssignmentsTable
            workspaceId={Number(workspaceId)}
            assignments={assignments}
          />
        )}
      </TabsContent>
      <TabsContent value="scoreboard"></TabsContent>
    </Tabs>
  );
};
