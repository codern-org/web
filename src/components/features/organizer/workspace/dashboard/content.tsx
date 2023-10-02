import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tab';
import { OrganizerAssignmentsTable } from '@/components/features/organizer/workspace/dashboard/assignment-table';
import { OrganizerWorkspaceSettings } from '@/components/features/organizer/workspace/dashboard/settings-layout';
import { OrganizerWorkspaceTab } from '@/libs/constants';
import { useNavigate, useParams } from 'react-router-dom';

export const OrganizerWorkspaceContent = () => {
  const navigate = useNavigate();
  const { content, settings } = useParams();
  const tab = content || (settings && OrganizerWorkspaceTab.SETTINGS);

  return (
    <Tabs
      value={tab}
      className="space-y-6"
    >
      <TabsList>
        {Object.keys(OrganizerWorkspaceTab).map((key) => {
          const tabContent = OrganizerWorkspaceTab[key as keyof typeof OrganizerWorkspaceTab];

          // TODO: refactor hardcoded redirect path
          let href = '' + tabContent;
          if (tabContent === OrganizerWorkspaceTab.SETTINGS) {
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
        {tab === OrganizerWorkspaceTab.ASSIGNMENT && <OrganizerAssignmentsTable />}
        {tab === OrganizerWorkspaceTab.PARTICIPANT && <></>}
        {tab === OrganizerWorkspaceTab.SETTINGS && <OrganizerWorkspaceSettings />}
      </TabsContent>
    </Tabs>
  );
};
