import { Separator } from '@/components/common/separator';
import { Skeleton } from '@/components/common/skeleton';

export const AssignmentHeaderSkeleton = () => {
  return (
    <div className="container flex flex-row items-center justify-between py-6">
      <div className="flex flex-col space-y-0.5">
        <div className="flex flex-row items-center space-x-2">
          <Skeleton className="h-7 w-32" />
          <div className="flex flex-row space-x-2">
            <Skeleton className="h-[21px] w-24" />
            <Separator
              orientation="vertical"
              className="h-5"
            />
            <Skeleton className="h-[21px] w-24" />
            <Skeleton className="h-[21px] w-24" />
          </div>
        </div>
        <Skeleton className="h-5 w-52" />
      </div>
      <Skeleton className="h-5 w-64" />
    </div>
  );
};