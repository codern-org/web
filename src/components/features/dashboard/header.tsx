import { Button } from '@/components/common/button';
import { SearchInput } from '@/components/common/search-input';

export const DashboardHeader = () => {
  return (
    <div className="container flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="mt-4 flex items-center space-x-2 md:mt-0">
        <SearchInput
          placeholder="Search workspace"
          className="h-9"
        />
        <Button size="sm">Add Workspace</Button>
      </div>
    </div>
  );
};
