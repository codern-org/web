import { Button } from '@/components/common/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/common/card';
import { Skeleton } from '@/components/common/skeleton';
import { MoreVerticalIcon } from 'lucide-react';

export const WorkspaceCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center space-x-3">
          <Skeleton className="h-10 w-10 flex-none bg-muted-foreground" />
          <Skeleton className="h-5 w-40" />
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
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-1 flex-1" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-12" />
      </CardFooter>
    </Card>
  );
};
