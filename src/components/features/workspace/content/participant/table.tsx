import { Button } from '@/components/common/button';
import { DataTableFacetedFilter } from '@/components/common/data-table-faceted-filer';
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
import { AdminParticipantTableRowActions } from '@/components/features/workspace/content/participant/admin-table-row-actions';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetWorkspaceQuery, useListWorkspaceParticipantQuery } from '@/hooks/workspace-hook';
import { formatDate } from '@/libs/utils';
import { WorkspaceParticipant, WorkspaceRole } from '@/types/workspace-type';
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
import { Loader2Icon, PlusIcon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

const roles = [
  {
    value: 'OWNER',
    label: 'Owner',
  },
  {
    value: 'ADMIN',
    label: 'Admin',
  },
  {
    value: 'MEMBER',
    label: 'Member',
  },
];

const columns: ColumnDef<WorkspaceParticipant>[] = [
  {
    header: 'No.',
    cell: ({ row }) => <>{row.index + 1}</>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <Image
          src={row.original.profileUrl}
          alt=""
          className="h-10 w-10 rounded-full"
        />
        <div className="flex flex-col space-y-1">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">{row.original.role}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'joinedAt',
    header: 'Joined date',
    cell: ({ row }) => formatDate(row.original.joinedAt, 'EEE, d MMM yyyy p'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <AdminParticipantTableRowActions row={row} />,
  },
];

export const WorkspaceParticipantTable = () => {
  const { workspaceId } = useWorkspaceParams();
  const { data: participants, isLoading } = useListWorkspaceParticipantQuery(workspaceId);
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);

  const data = useMemo(() => participants || [], [participants]);
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
        <h3 className="mb-4 text-lg font-medium md:mb-0">
          Participants {participants && <>({participants.length})</>}
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
            column={table.getColumn('role')}
            title="Role"
            options={roles}
            align="end"
          />

          <SearchInput
            type="search"
            className="h-9 py-0"
            placeholder="Search by name"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          />

          {workspace && [WorkspaceRole.ADMIN, WorkspaceRole.OWNER].includes(workspace.role) && (
            <Button
              size="sm"
              className="h-9"
            >
              {/* TODO: implement it */}
              <PlusIcon className="mr-1 h-4 w-4" />
              Add
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
                    onClick={
                      () => {}
                      // navigate(RoutePath.ASSIGNMENT(workspaceId, row.original.id))
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
