import { PageLayout } from '@/components/common/page-layout';
import { PageNavigationBar } from '@/components/features/dashboard/page-navigation-bar';
import { AssignmentBreadcrumb } from '@/components/features/workspace/assignment/breadcrumb';
import { AssignmentHeader } from '@/components/features/workspace/assignment/header';
import { ProblemPane } from '@/components/features/workspace/assignment/problem-pane';
import { EditorProvider } from '@/hooks/editor-hook';
import { ProblemPaneProvider } from '@/hooks/problem-pane-hook';
import { Suspense, lazy } from 'react';

const EditorPane = lazy(() => import('@/components/features/workspace/assignment/editor-pane'));

export const AssignmentPage = () => {
  return (
    <PageLayout className="flex h-screen flex-col">
      <PageNavigationBar />
      <AssignmentBreadcrumb className="container pt-6" />
      <AssignmentHeader className="container" />

      <ProblemPaneProvider>
        <div className="container mb-6 flex h-full flex-row justify-between space-x-4 overflow-hidden">
          <div className="w-2/5">
            <ProblemPane />
          </div>
          <div className="w-3/5">
            <Suspense>
              <EditorProvider>
                <EditorPane />
              </EditorProvider>
            </Suspense>
          </div>
        </div>
      </ProblemPaneProvider>
    </PageLayout>
  );
};
