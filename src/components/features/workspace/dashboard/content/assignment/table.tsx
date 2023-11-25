import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import { DataTableFacetedFilter } from '@/components/common/data-table-faceted-filer';
import { DataTablePagination } from '@/components/common/data-table-pagination';
import { SearchInput } from '@/components/common/search-input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/tooltip';
import { useGetWorkspaceQuery, useListAssignmentQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';
import { formartDateDist, formatDate } from '@/libs/utils';
import { Assignment, WorkspaceRole } from '@/types/workspace-type';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CircleIcon, Loader2Icon, PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const statuses = [
  {
    value: 'TODO',
    label: 'Todo',
    icon: <CircleIcon className="h-2 w-2 fill-yellow-400 stroke-none" />,
  },
  {
    value: 'GRADING',
    label: 'Grading',
    icon: <CircleIcon className="h-2 w-2 fill-muted-foreground stroke-none" />,
  },
  {
    value: 'INCOMPLETED',
    label: 'Failed',
    icon: <CircleIcon className="h-2 w-2 fill-danger stroke-none" />,
  },
  {
    value: 'COMPLETED',
    label: 'Passed',
    icon: <CircleIcon className="h-2 w-2 fill-green-400 stroke-none" />,
  },
];

const levels = [
  {
    value: 'EASY',
    label: 'Easy',
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
  },
  {
    value: 'HARD',
    label: 'Hard',
  },
];

const columns: ColumnDef<Assignment>[] = [
  {
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
    cell: ({ row }) => {
      const level = levels.find((level) => level.value === row.original.level);
      if (!level) return null;
      return <span>{level.label}</span>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    header: 'Due date',
    cell: ({ row }) => {
      return !row.original.dueDate ? (
        <span className="text-xs text-muted-foreground">No due date</span>
      ) : (
        <span className="text-xs">{formatDate(row.original.dueDate, 'EEE, d MMM yyyy p')}</span>
      );
    },
  },
  {
    header: 'Submission',
    cell: ({ row }) => {
      if (!row.original.lastSubmittedAt) return <>-</>;
      const isLate = row.original.lastSubmittedAt > row.original.dueDate;
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={isLate ? 'muted' : 'outline'}>{isLate ? 'Late' : 'In time'}</Badge>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col">
              <span className="text-xs">
                Submitted on {formatDate(row.original.lastSubmittedAt, 'EEE, d MMM yyyy p')}
              </span>
              {isLate && (
                <span className="text-xs text-muted-foreground">
                  (Late {formartDateDist(row.original.dueDate, row.original.lastSubmittedAt)})
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.original.status);
      if (!status) return null;
      return (
        <div className="flex items-center space-x-2">
          {status.icon}
          <span className="capitalize">{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];

export const AssignmentsTable = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { data: assignments, isLoading } = useListAssignmentQuery(Number(workspaceId));
  const { data: workspace } = useGetWorkspaceQuery(Number(workspaceId));

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: assignments || [],
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h3 className="mb-4 text-lg font-medium md:mb-0">
          Your Assignments {assignments && <>({assignments.length})</>}
        </h3>
        <div className="flex flex-row-reverse space-x-2 space-x-reverse md:flex-row md:space-x-2">
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.resetColumnFilters()}
            >
              Reset
              <XIcon className="ml-2 h-4 w-4" />
            </Button>
          )}

          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
            align="end"
          />
          <DataTableFacetedFilter
            column={table.getColumn('level')}
            title="Level"
            options={levels}
            align="end"
          />

          <div className="w-full">
            <SearchInput
              type="search"
              className="h-9 py-0"
              placeholder="Search by name"
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            />
          </div>

          {workspace && [WorkspaceRole.ADMIN, WorkspaceRole.OWNER].includes(workspace.role) && (
            <Button
              size="sm"
              className="h-9"
              asChild
            >
              <Link to={RoutePath.CREATE_ASSIGNMENT(Number(workspaceId))}>
                <PlusIcon className="mr-1 h-4 w-4" />
                Create
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-md border bg-background">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() =>
                      navigate(RoutePath.ASSIGNMENT(Number(workspaceId), row.original.id))
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Loading
                      </div>
                    ) : (
                      'No results'
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};
