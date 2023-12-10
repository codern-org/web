import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Separator } from '@/components/common/separator';

export const WorkspaceInvitationSettings = () => {
  return (
    <div>
      <h3 className="text-lg font-medium">Invitation</h3>
      <div className="mt-4"></div>
      <Separator />
      <div className="mt-8 space-y-4">
        <div className="mt-4">Invite link</div>
        <div className="flex items-center">
          <Input className="mr-4 w-1/3" />
          <Button>Copy Link</Button>
        </div>
      </div>
    </div>
  );
};
