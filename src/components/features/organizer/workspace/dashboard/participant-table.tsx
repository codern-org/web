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
import { PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
          <span className="text-muted-foreground">{row.original.description}</span>
        </div>
      );
    },
  },
  {
    header: 'Created at',
    cell: ({ row }) => dayjs(row.original.createdAt).format('ddd, DD MMM YYYY'),
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
];

type OrganizerParticipantTableProps = {
  workspaceId: number;
  assignments: Assignment[] | undefined;
};

export const OrganizerParticipantTable = ({
  workspaceId,
  assignments,
}: OrganizerParticipantTableProps) => {
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
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row space-x-2">
          <SearchInput
            type="search"
            className="h-9 w-full py-0"
            placeholder="Search assignment"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          />

          <DataTableFacetedFilter
            column={table.getColumn('level')}
            title="Level"
            options={levels}
            align="start"
          />

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
        </div>
        <Button className="h-9">
          <PlusIcon className="mr-1 h-4 w-4" />
          Create assignment
        </Button>
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
