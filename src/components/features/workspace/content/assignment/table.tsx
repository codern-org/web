import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import { DataTableColumnHeader } from '@/components/common/data-table-column-header';
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
import { useLocalStorage } from '@/hooks/localstorage-hook';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useGetWorkspaceQuery, useListAssignmentQuery } from '@/hooks/workspace-hook';
import { RoutePath } from '@/libs/constants';
import { formartDateDist, formatDate } from '@/libs/utils';
import { Assignment, WorkspaceRole } from '@/types/workspace-type';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
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
import { MouseEvent, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="No,"
      />
    ),
    cell: ({ row }) => row.index + 1,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-1">
          <span className="font-medium leading-none">{row.original.name}</span>
          <span className="text-muted-foreground">{row.original.description}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'level',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Level"
      />
    ),
    cell: ({ row }) => {
      const level = levels.find((level) => level.value === row.original.level);
      if (!level) return null;
      return <span>{level.label}</span>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Due date"
      />
    ),
    cell: ({ row }) => {
      return !row.original.dueDate ? (
        <span className="text-xs text-muted-foreground">No due date</span>
      ) : (
        <span className="text-xs">{formatDate(row.original.dueDate, 'EEE, d MMM yyyy p')}</span>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    header: 'Submission',
    cell: ({ row }) => {
      if (!row.original.lastSubmittedAt) return <>-</>;
      const isLate = row.original.dueDate
        ? row.original.lastSubmittedAt > row.original.dueDate
        : false;
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
    accessorKey: 'score',
    header: 'Score',
    cell: ({ row }) => {
      return row.original.score === null ? (
        <span className="text-xs text-muted-foreground">None</span>
      ) : (
        <span className="text-xs">
          {row.original.score} / {row.original.maxScore}
        </span>
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

export const AssignmentTable = () => {
  const navigate = useNavigate();
  const { workspaceId } = useWorkspaceParams();
  const { data: assignments, isLoading } = useListAssignmentQuery(workspaceId);
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);

  const data = useMemo(() => assignments || [], [assignments]);
  const [tableState, setTableState] = useLocalStorage('assignment-table-state', {
    sorting: [{ id: 'id', desc: true }] as SortingState,
    columnFilters: [] as ColumnFiltersState,
    pagination: { pageIndex: 0, pageSize: 10 } as PaginationState,
  });

  const table = useReactTable({
    data,
    columns,
    state: tableState,
    onSortingChange: (updater) => {
      console.log(updater);
      if (typeof updater === 'function') {
        setTableState({ ...tableState, sorting: updater(tableState.sorting) });
      } else {
        setTableState({ ...tableState, sorting: updater });
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === 'function') {
        setTableState({ ...tableState, columnFilters: updater(tableState.columnFilters) });
      } else {
        setTableState({ ...tableState, columnFilters: updater });
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        setTableState({ ...tableState, pagination: updater(tableState.pagination) });
      } else {
        setTableState({ ...tableState, pagination: updater });
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().sorting.length > 0;

  const resetFilter = () => {
    table.resetColumnFilters();
    table.resetSorting();
  };

  // TODO: better solution without hack
  // Hacky way to prevent page navigation when click dropdown button on table row
  // Try to use Link component but it's not working because of how HTML work to render <td>sZ
  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, row: Row<Assignment>) => {
    const target = event.target as Element;
    const role = target.getAttribute('role'); // For open dialog
    const state = target.getAttribute('data-state'); // For close dialog
    const buttonType = target.getAttribute('type'); // For dialog button click
    if (role === 'menuitem' || state === 'open' || buttonType) return;
    navigate(RoutePath.ASSIGNMENT(workspaceId, row.original.id));
  };

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
              onClick={resetFilter}
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
              asChild
            >
              <Link to={RoutePath.CREATE_ASSIGNMENT(workspaceId)}>
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
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={(event) => handleRowClick(event, row)}
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
