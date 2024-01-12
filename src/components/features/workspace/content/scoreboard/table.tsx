import { Button } from '@/components/common/button';
import { DataTablePagination } from '@/components/common/data-table-pagination';
import { Image } from '@/components/common/image';
import { SearchInput } from '@/components/common/search-input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetScoreboardQuery, useListWorkspaceParticipantQuery } from '@/hooks/workspace-hook';
import { formatDate } from '@/libs/utils';
import { WorkspaceRank, WorkspaceRole } from '@/types/workspace-type';
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
import { Loader2Icon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

const columns: ColumnDef<WorkspaceRank>[] = [
  {
    header: 'Rank',
    cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    accessorKey: 'displayName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <Image
          src={row.original.profileUrl}
          alt=""
          className="h-10 w-10 rounded-full"
        />
        <span className="font-medium">{row.original.displayName}</span>
      </div>
    ),
  },
  {
    accessorKey: 'score',
    header: 'Score',
    cell: ({ row }) => <div className="font-medium">{row.original.score}</div>,
  },
  {
    accessorKey: 'completedAssignment',
    header: 'Completed assignments',
    cell: ({ row }) => row.original.completedAssignment,
  },
  {
    accessorKey: 'totalSubmissions',
    header: 'Total submitted',
    cell: ({ row }) => row.original.totalSubmissions,
  },
  {
    accessorKey: 'lastSubmission',
    header: 'Last submitted at',
    cell: ({ row }) => {
      return (
        <span className="text-xs">
          {formatDate(row.original.lastSubmittedAt, 'EEE, d MMM yyyy p')}
        </span>
      );
    },
  },
];

export const WorkspaceScoreboardTable = () => {
  const { workspaceId } = useWorkspaceParams();
  const { data: scoreboard, isLoading } = useGetScoreboardQuery(workspaceId);
  const { data: participants } = useListWorkspaceParticipantQuery(workspaceId);

  const data = useMemo(() => {
    if (!participants || !scoreboard) return [];
    const memberIds = participants
      .filter((participant) => participant.role === WorkspaceRole.MEMBER)
      .map((participant) => participant.userId);
    return scoreboard.filter((data) => memberIds.includes(data.userId));
  }, [scoreboard, participants]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      columnVisibility: { role: false },
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
        <h3 className="mb-4 text-lg font-medium md:mb-0">Scoreboard</h3>
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

          <SearchInput
            type="search"
            className="h-9 py-0"
            placeholder="Search by name"
            value={(table.getColumn('displayName')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('displayName')?.setFilterValue(event.target.value)}
          />
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
                    onClick={() => {}}
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
