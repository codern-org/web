import { Separator } from '@/components/common/separator';
import { DeleteWorkspaceDialog } from '@/components/features/workspace/content/settings/content/delete-workspace-dialog';
import { UpdateWorkspaceForm } from '@/components/features/workspace/content/settings/content/update-workspace-form';

export const WorkspaceGeneralSettings = () => {
  return (
    <>
      <h3 className="mb-2 text-lg font-medium">General</h3>
      <Separator className="mb-6" />
      <div className="space-y-8">
        <UpdateWorkspaceForm />
        <div className="space-y-4 rounded-md border border-danger p-4">
          <div className="text-lg font-semibold text-danger">Danger zone</div>
          <div className="font-medium">Delete this workspace</div>
          <div className="text-muted-foreground">
            This will permanently delete your workspace and remove your data from our servers. Be
            careful and certain before you proceed, as this action cannot be undone.
          </div>
          <DeleteWorkspaceDialog />
        </div>
      </div>
    </>
  );
};
