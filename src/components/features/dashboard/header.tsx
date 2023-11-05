import { MojiBun } from '@/components/common/moji-bun';

export const DashboardHeader = () => {
  return (
    <div className="border-b bg-background py-8">
      <div className="container relative flex flex-row items-center justify-between">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <MojiBun className="absolute -bottom-12 right-12 h-32 w-32" />
      </div>
    </div>
  );
};
