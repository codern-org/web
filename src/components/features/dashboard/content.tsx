import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import { SearchInput } from '@/components/common/search-input';
import { WorkspaceCard } from '@/components/features/dashboard/workspace-card';
import { WorkspaceCardSkeleton } from '@/components/features/dashboard/workspace-card-skeleton';
import { useListWorkspaceQuery } from '@/hooks/workspace-hook';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export const DashboardContent = () => {
  const { data: workspaces, isLoading } = useListWorkspaceQuery();
  const [workspaceFilter, setWorkspaceFilter] = useState<string>('');

  const filteredWorkspace = workspaces?.filter((workspace) =>
    workspace.name.includes(workspaceFilter),
  );

  return (
    <div className="container py-8 backdrop-blur-xl">
      <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="mb-3 flex items-center space-x-2 text-2xl font-semibold sm:mb-0">
          <span>Workspaces</span>
          {workspaces && (
            <Badge
              variant="muted"
              className="text-sm text-secondary-foreground"
            >
              {workspaces.length}
            </Badge>
          )}
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-full">
            <SearchInput
              placeholder="Search workspace"
              className="h-9"
              onChange={(event) => setWorkspaceFilter(event.target.value)}
            />
          </div>
          <Button size="sm">
            <PlusIcon className="mr-0.5 h-4 w-4" />
            Workspace
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredWorkspace &&
          filteredWorkspace
            .filter((workspace) => workspace.name.includes(workspaceFilter))
            .map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
              />
            ))}
        {isLoading && <WorkspaceCardSkeleton />}
      </div>
      {filteredWorkspace?.length === 0 && (
        <div className="text-sm text-muted-foreground">
          Looks like you haven't joined any workspaces yet
        </div>
      )}
    </div>
  );
};
