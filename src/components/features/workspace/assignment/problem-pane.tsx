import { Markdown } from '@/components/common/markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { SubmissionList } from '@/components/features/workspace/assignment/submission-list';
import { ProblemPaneTabs, useProblemPane } from '@/hooks/problem-pane-hook';
import {
  useAssignmentDetail,
  useGetAssignmentQuery,
  useListSubmission,
  useListSubmissionSubscription,
} from '@/hooks/workspace-hook';
import { Loader2Icon, XIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ProblemPane = () => {
  const { workspaceId, assignmentId } = useParams();
  const { tab, setTab } = useProblemPane();
  const { data: submissions } = useListSubmission(Number(workspaceId), Number(assignmentId));
  const { data: assignment } = useGetAssignmentQuery(Number(workspaceId), Number(assignmentId));
  const {
    data: detail,
    isError: isDetailError,
    isLoading: isDetailLoading,
  } = useAssignmentDetail(Number(workspaceId), assignment);

  useListSubmissionSubscription();

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
        {detail && <Markdown markdown={detail} />}
        {isDetailError && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <XIcon className="mr-1 h-5 w-5" />
            Cannot load detail
          </div>
        )}
        {isDetailLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2Icon className="mr-1 h-5 w-5 animate-spin text-muted-foreground" />
            Loading
          </div>
        )}
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
