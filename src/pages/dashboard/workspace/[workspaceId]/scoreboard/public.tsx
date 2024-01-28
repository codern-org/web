import { Image } from '@/components/common/image';
import { MojiBun } from '@/components/common/moji-bun';
import { PageLayout } from '@/components/common/page-layout';
import { Skeleton } from '@/components/common/skeleton';
import { DashboardNavBar } from '@/components/features/dashboard/dashboard-navbar';
import { WorkspaceScoreboardTable } from '@/components/features/workspace/content/scoreboard/table';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetWorkspaceQuery } from '@/hooks/workspace-hook';

function PublicScoreboardPage() {
  const { workspaceId } = useWorkspaceParams();
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);

  return (
    <PageLayout>
      <DashboardNavBar />
      <div className="min-h-screen bg-accent/30">
        <div className="border-b bg-background">
          <div className="container relative flex items-center space-x-5 overflow-hidden py-8">
            <Image
              src={workspace?.profileUrl}
              alt=""
              className="h-12 w-12 rounded-md"
            />
            {workspace ? (
              <div className="flex flex-col">
                <h2 className="text-3xl font-semibold leading-tight tracking-tight">
                  {workspace.name}
                </h2>
                <div className="mb-1 text-sm text-secondary-foreground">{workspace.ownerName}</div>
              </div>
            ) : (
              <div className="flex flex-col">
                <Skeleton className="mb-2 h-7 w-48" />
                <Skeleton className="h-4 w-48" />
              </div>
            )}
            <MojiBun className="absolute -bottom-2 right-20 z-10 h-28 w-28 animate-gelatine repeat-infinite" />
          </div>
        </div>
        <div className="container py-6">
          <WorkspaceScoreboardTable />
        </div>
      </div>
    </PageLayout>
  );
}

export default PublicScoreboardPage;
