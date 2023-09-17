import { Button } from '@/components/common/button';
import { DataTableFacetedFilter } from '@/components/common/data-table-faceted-filer';
import { DataTablePagination } from '@/components/common/data-table-pagination';
import { Input } from '@/components/common/input';
import { Label } from '@/components/common/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';
import { RoutePath } from '@/libs/constants';
import { Assignment } from '@/types/workspace-type';
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
import dayjs from 'dayjs';
import { CircleIcon, SearchIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    value: 'ERROR',
    label: 'Error',
    icon: <CircleIcon className="h-2 w-2 fill-danger stroke-none" />,
  },
  {
    value: 'DONE',
    label: 'Done',
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
          <span className="text-secondary-foreground">{row.original.description}</span>
        </div>
      );
    },
  },
  {
    header: 'Created at',
    cell: ({ row }) => dayjs(row.original.createdAt).format('ddd, DD MMM YYYY'),
  },
  {
    header: 'Last sumitted at',
    cell: ({ row }) => {
      if (!row.original.lastSubmittedAt) return <>-</>;
      return <>{dayjs(row.original.lastSubmittedAt).format('ddd, DD MMM YYYY H:m A')}</>;
    },
  },
  {
    accessorKey: 'level',
    header: 'Level',
    cell: ({ row }) => {
      const level = levels.find((level) => level.value === row.getValue('level'));
      if (!level) return null;
      return <span>{level.label}</span>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'));
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

type AssignmentsTableProps = {
  workspaceId: number;
  assignments: Assignment[] | undefined;
};

export const AssignmentsTable = ({ workspaceId, assignments }: AssignmentsTableProps) => {
  const navigate = useNavigate();

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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Your Assignments {assignments && <>({assignments.length})</>}
        </h3>
        <div className="flex space-x-2">
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

          <Label className="relative">
            <SearchIcon
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 transform"
            />
            <Input
              type="search"
              placeholder="Search assignment"
              className="h-9 py-0 pl-8"
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            />
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-md border">
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
                      navigate(
                        RoutePath.ASSIGNMENT.replace(
                          ':workspaceId',
                          workspaceId.toString(),
                        ).replace(':assignmentId', row.original.id.toString()),
                      )
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
                    No results
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
