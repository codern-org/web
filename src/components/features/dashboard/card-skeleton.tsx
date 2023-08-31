import { Card, CardContent, CardFooter, CardHeader } from '@/components/common/card';
import { Skeleton } from '@/components/common/skeleton';

export const WorkspaceCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex-row items-center space-x-3">
        <Skeleton className="h-10 w-10 flex-none bg-muted-foreground" />
        <div className="mb-1 flex flex-col space-y-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-3 w-24" />
        </div>
      </CardHeader>
      <CardContent className="flex items-center space-x-2">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-6 w-12" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-1 w-full bg-muted" />
      </CardFooter>
    </Card>
  );
};
