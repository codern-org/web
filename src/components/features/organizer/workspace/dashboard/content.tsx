import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { OrganizerAssignmentsTable } from '@/components/features/organizer/workspace/dashboard/assignment-table';
import { OrganizerWorkspaceSettings } from '@/components/features/organizer/workspace/dashboard/settings/settings';
import { WorkspaceContent } from '@/libs/constants';
import { useNavigate, useParams } from 'react-router-dom';

export const OrganizerWorkspaceContent = () => {
  const navigate = useNavigate();
  const { content, settings } = useParams();
  const tab = content || (settings && WorkspaceContent.SETTINGS);

  return (
    <Tabs
      value={tab}
      className="container space-y-6 py-8"
    >
      <TabsList>
        {Object.keys(WorkspaceContent).map((key) => {
          const tabContent = WorkspaceContent[key as keyof typeof WorkspaceContent];

          // TODO: refactor hardcoded redirect path
          let href = '' + tabContent;
          if (tabContent === WorkspaceContent.SETTINGS) {
            href = './settings/general';
          }

          return (
            <TabsTrigger
              key={tabContent}
              value={tabContent}
              onClick={() => navigate(href)}
              className="capitalize"
            >
              {tabContent}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value={tab || ''}>
        {tab === WorkspaceContent.ASSIGNMENT && <OrganizerAssignmentsTable />}
        {tab === WorkspaceContent.PARTICIPANT && <></>}
        {tab === WorkspaceContent.SETTINGS && <OrganizerWorkspaceSettings />}
      </TabsContent>
    </Tabs>
  );
};
