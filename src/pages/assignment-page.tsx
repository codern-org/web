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

      <div className="h-full overflow-hidden bg-accent/30 py-6">
        <div className="container flex h-full flex-col overflow-hidden">
          <AssignmentBreadcrumb />
          <AssignmentHeader />
          <ProblemPaneProvider>
            <div className="flex h-full flex-col justify-between space-y-4 overflow-hidden lg:flex-row lg:space-x-4 lg:space-y-0">
              <div className="w-full lg:w-2/5">
                <ProblemPane />
              </div>
              <div className="h-full w-full lg:h-auto lg:w-3/5">
                <Suspense>
                  <EditorProvider>
                    <EditorPane />
                  </EditorProvider>
                </Suspense>
              </div>
            </div>
          </ProblemPaneProvider>
        </div>
      </div>
    </PageLayout>
  );
};
