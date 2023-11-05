import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import { SearchInput } from '@/components/common/search-input';
import { WorkspaceCard } from '@/components/features/dashboard/card';
import { WorkspaceCardSkeleton } from '@/components/features/dashboard/card-skeleton';
import { useListWorkspaceQuery } from '@/hooks/workspace-hook';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export const DashboardContent = () => {
  const { data: workspaces } = useListWorkspaceQuery();
  const [workspaceFilter, setWorkspaceFilter] = useState<string>('');

  return (
    <div className="container py-8 backdrop-blur-xl">
      <div className="mb-6 flex flex-row items-center justify-between">
        <h2 className="flex items-center space-x-2 text-2xl font-semibold">
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
        <div className="flex flex-row items-center space-x-2">
          <SearchInput
            placeholder="Search workspace"
            className="h-9"
            onChange={(event) => setWorkspaceFilter(event.target.value)}
          />
          <Button
            size="sm"
            className="space-x-0.5"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Workspace</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {workspaces &&
          workspaces
            .filter((workspace) => workspace.name.includes(workspaceFilter))
            .map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
              />
            ))}
        {!workspaces && <WorkspaceCardSkeleton />}
      </div>
      {workspaces && workspaces.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Looks like you haven't joined any workspaces yet
        </p>
      )}
    </div>
  );
};
