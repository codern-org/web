import { Markdown } from '@/components/common/markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { SubmissionList } from '@/components/features/workspace/assignment/submission-list';
import { ProblemPaneTabs, useProblemPane } from '@/hooks/problem-pane-hook';
import {
  useGetAssignmentQuery,
  useGetProblemDetailQuery,
  useListSubmission,
} from '@/hooks/workspace-hook';
import { useParams } from 'react-router-dom';

export const ProblemPane = () => {
  const { workspaceId, assignmentId } = useParams();
  const { tab, setTab } = useProblemPane();
  const { submissions } = useListSubmission(Number(workspaceId), Number(assignmentId));
  const { data: assignment } = useGetAssignmentQuery(Number(workspaceId), Number(assignmentId));
  const { problemDetail } = useGetProblemDetailQuery(assignment);

  return (
    <Tabs
      value={tab}
      onValueChange={(tab) => setTab(tab as ProblemPaneTabs)}
      className="flex h-full flex-col items-start space-y-6 overflow-hidden rounded-md border bg-background p-6"
    >
      <TabsList className="h-8">
        <TabsTrigger
          value="problem"
          className="h-6"
        >
          Problem
        </TabsTrigger>
        <TabsTrigger
          value="submission"
          className="h-6 space-x-0.5"
        >
          <span>Submission</span>
          {submissions && <span className="text-xs">({submissions.length})</span>}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="problem"
        className="w-full overflow-y-auto"
      >
        {problemDetail && <Markdown markdown={problemDetail} />}
      </TabsContent>
      <TabsContent
        value="submission"
        className="w-full overflow-y-auto pr-0"
      >
        <SubmissionList />
      </TabsContent>
    </Tabs>
  );
};
