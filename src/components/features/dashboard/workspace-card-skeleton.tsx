import { Button } from '@/components/common/button';
import { Card, CardContent, CardHeader } from '@/components/common/card';
import { Skeleton } from '@/components/common/skeleton';
import { MoreVerticalIcon } from 'lucide-react';

export const WorkspaceCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-3">
          <Skeleton className="h-11 w-11 flex-none bg-muted-foreground" />
          <div className="flex flex-col">
            <Skeleton className="mb-2 h-5 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Button
          className="p-2 text-muted-foreground"
          variant="ghost"
          disabled
        >
          <MoreVerticalIcon className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex items-center space-x-2">
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-6 w-14" />
        <Skeleton className="h-1 flex-1" />
        <Skeleton className="h-4 w-6" />
      </CardContent>
    </Card>
  );
};
