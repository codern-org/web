import { Button } from '@/components/common/button';
import { SearchInput } from '@/components/common/search-input';
import { Separator } from '@/components/common/separator';

export const WorkspaceAdminSettings = () => {
  return (
    <div>
      <h3 className="text-lg font-medium">Admin</h3>
      <div className="mt-4"></div>
      <Separator />
      <div className="mt-8 space-y-4">
        <div className="mt-4">Search admin</div>
        <SearchInput className="mr-4 mt-4 w-1/2" />
        <Button className="mr-4 h-8 w-1/2 bg-[#1A8E2C] py-2 text-white"> Add admin </Button>
      </div>
    </div>
  );
};
