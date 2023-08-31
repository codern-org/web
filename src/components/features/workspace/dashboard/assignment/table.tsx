import { Button } from '@/components/common/button';
import { DataTable } from '@/components/common/data-table';
import { Input } from '@/components/common/input';
import { Label } from '@/components/common/label';
import { useListAssignmentQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';
import { classNames } from '@/libs/utils';
import { Assignment } from '@/types/workspace-type';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { ColumnDef } from '@tanstack/react-table';
import { CommandInput } from 'cmdk';
import { Command, ListFilterIcon, SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const columns: ColumnDef<Assignment>[] = [
  {
    accessorKey: 'id',
    header: 'No.',
    cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-1">
          <span className="font-medium leading-none">{row.original.name}</span>
          <span className="text-muted-foreground">{row.original.description}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'level',
    header: 'Level',
    cell: ({ row }) => <span className="capitalize">{row.original.level.toLowerCase()}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => {
      const statuses = ['TODO', 'DONE', 'ERROR'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return (
        <div className="flex items-center space-x-2">
          <span
            className={classNames(
              'h-2 w-2 rounded-full',
              status === 'TODO' && 'bg-yellow-500',
              status === 'DONE' && 'bg-green-500',
              status === 'ERROR' && 'bg-danger',
            )}
          />
          <span className="capitalize">{status.toLowerCase()}</span>
        </div>
      );
    },
  },
];

type AssignmentTableProps = {
  workspaceId: number;
  data: Assignment[] | undefined;
};

export const AssignmentsTable = ({ workspaceId, data }: AssignmentTableProps) => {
  const { data: assignments } = useListAssignmentQuery(workspaceId);
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Your Assignments {data && <>({data.length})</>}</h3>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-dashed"
              >
                <ListFilterIcon className="mr-2 h-4 w-4" />
                Status
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-52 p-0"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Status"></CommandInput>
              </Command>
            </PopoverContent>
          </Popover>

          <Label className="relative">
            <SearchIcon
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 transform"
            />
            <Input
              type="search"
              placeholder="Search assignment"
              className="h-9 py-0 pl-8"
              onChange={() => {}}
            />
          </Label>
        </div>
      </div>

      <DataTable
        data={assignments || []}
        columns={columns}
        onClickRow={(row) =>
          navigate(
            RoutePath.ASSIGNMENT.replace(':workspaceId', workspaceId.toString()).replace(
              ':assignmentId',
              row.original.id.toString(),
            ),
          )
        }
      />
    </div>
  );
};
