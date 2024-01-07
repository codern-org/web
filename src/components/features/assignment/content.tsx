import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/common/resizable';
import { ProblemPane } from '@/components/features/assignment/problem-pane';
import { EditorProvider } from '@/hooks/editor-hook';
import { ProblemPaneProvider } from '@/hooks/problem-pane-hook';
import { Suspense, lazy } from 'react';

const EditorPane = lazy(() => import('@/components/features/assignment/editor-pane'));

export const AssignmentContent = () => {
  return (
    <ProblemPaneProvider>
      <ResizablePanelGroup
        direction="horizontal"
        className="container flex h-full flex-col justify-between space-y-4 overflow-hidden py-6 lg:flex-row lg:space-x-4 lg:space-y-0"
      >
        <ResizablePanel defaultSize={40}>
          <ProblemPane />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={60}
          className="h-full w-full lg:h-auto lg:w-3/5"
        >
          <Suspense>
            <EditorProvider>
              <EditorPane />
            </EditorProvider>
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ProblemPaneProvider>
  );
};
