import { Markdown } from '@/components/common/markdown';
import { PDFDocument } from '@/components/common/pdf-document';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { SubmissionList } from '@/components/features/assignment/submission-list';
import { ProblemPaneTabs, useProblemPane } from '@/hooks/problem-pane-hook';
import { useWorkspaceParams } from '@/hooks/router-hook';
import {
  useAssignmentDetail,
  useGetAssignmentQuery,
  useListSubmission,
  useListSubmissionSubscription,
} from '@/hooks/workspace-hook';
import { resolveFileUrl } from '@/libs/utils';
import { Loader2Icon, XIcon } from 'lucide-react';

export const ProblemPane = () => {
  const { workspaceId, assignmentId } = useWorkspaceParams();
  const { tab, setTab } = useProblemPane();
  const { data: submissions } = useListSubmission(workspaceId, assignmentId, false);
  const { data: assignment, isLoading: isAssignmentLoading } = useGetAssignmentQuery(
    workspaceId,
    assignmentId,
  );

  const isPdfDetail = assignment?.detailUrl.endsWith('.pdf');

  // We need to load content of detailUrl file with extension equals to .md
  const {
    data: detail,
    isError: isDetailError,
    isLoading: isDetailLoading,
  } = useAssignmentDetail(workspaceId, assignment, !isAssignmentLoading && !isPdfDetail);

  const isLoading = isAssignmentLoading || isDetailLoading;

  useListSubmissionSubscription(workspaceId, assignmentId);

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
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2Icon className="mr-1 h-5 w-5 animate-spin text-muted-foreground" />
            Loading
          </div>
        )}

        {!isPdfDetail && !isLoading && (
          <>
            {detail && <Markdown markdown={detail} />}
            {isDetailError && (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <XIcon className="mr-1 h-5 w-5" />
                Cannot load detail
              </div>
            )}
          </>
        )}

        {isPdfDetail && !isLoading && (
          <PDFDocument file={resolveFileUrl(assignment?.detailUrl || '')} />
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
