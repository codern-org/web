import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { Input } from '@/components/common/input';
import { Separator } from '@/components/common/separator';
import { Textarea } from '@/components/common/textarea';
import { UploadCloud } from 'lucide-react';

export const WorkspaceGeneralSettings = () => {
  return (
    <div>
      <h3 className="text-lg font-medium">General</h3>
      <div className="mt-4"></div>
      <Separator />
      <div className="mt-8 space-y-4">
        <div className="mt-4">Workspace Name</div>
        <Input className="mr-4 w-1/3" />
        <div className="mt-4">Workspace Detail</div>
        <Textarea className="mr-4 h-24 w-1/3 resize-y" />
        <div className="mt-4">Workspace Image</div>
        <Card className="mr-4 flex h-72 w-1/3 resize-y items-center justify-center">
          <UploadCloud className="text-4xl text-gray-400" />
        </Card>
        <Button className="mr-4 w-1/3"> Save Change </Button>
      </div>
      <div className="mt-16 w-1/2 space-y-4 rounded-md border border-red-500 p-4">
        <div className="text-lg font-semibold">Danger zone</div>
        <div className="font-mediam">Delete this workspace</div>
        <div className="overflow-auto">
          This action cannot be undone. This will permanently delete your workspace and remove your
          data from our servers. Please be certain.
        </div>
        <Button className="mr-4 w-1/2 bg-[#EF4444] text-white"> Delete this workspace </Button>
      </div>
    </div>
  );
};
