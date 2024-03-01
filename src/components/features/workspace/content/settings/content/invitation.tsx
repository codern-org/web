import { Button } from '@/components/common/button';
import { Calendar } from '@/components/common/calendar';
import { DataTablePagination } from '@/components/common/data-table-pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/common/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';
import { useStrictForm } from '@/hooks/form-hook';
import { useWorkspaceParams } from '@/hooks/router-hook';
import {
  useCreateInvitation,
  useGetWorkspaceQuery,
  useListInvitationQuery,
} from '@/hooks/workspace-hook';
import { formatDate } from '@/libs/utils';
import {
  CreateInvitationSchema,
  CreateInvitationSchemaValues,
  InvitationDefaultValues,
} from '@/types/schema/workspace-schema';
import { Invitation, WorkspaceRole } from '@/types/workspace-type';
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
import { format } from 'date-fns';
import { CalendarIcon, Loader2Icon, PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

const columns: ColumnDef<Invitation>[] = [
  {
    header: 'No.',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'id',
    header: 'Invitation code',
    cell: ({ row }) => (
      <div className="flex items-center space-x-4">
        <div className="flex flex-col space-y-1">
          <span className="font-medium">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'validAt',
    header: 'Start date',
    cell: ({ row }) => formatDate(row.original.validAt, 'EEE, d MMM yyyy p'),
  },
  {
    accessorKey: 'validUntil',
    header: 'Expire date',
    cell: ({ row }) => formatDate(row.original.validUntil, 'EEE, d MMM yyyy p'),
  },
];

export const WorkspaceInvitationSettings = () => {
  const { workspaceId } = useWorkspaceParams();
  const { data: invitation, isLoading } = useListInvitationQuery(workspaceId);
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);
  const { mutate: create } = useCreateInvitation(workspaceId);

  const [isOpen, setIsOpen] = useState(false);

  const form = useStrictForm(CreateInvitationSchema, InvitationDefaultValues);

  const onSubmit = (data: CreateInvitationSchemaValues) => {
    setIsOpen(false);
    create({ validAt: data.validAt, validUntil: data.validUntil });
  };

  const data = useMemo(() => invitation || [], [invitation]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h3 className="mb-4 text-lg font-medium md:mb-0">
          Invitation {invitation && <>({invitation.length})</>}
        </h3>
        <div className="flex flex-row-reverse space-x-2 space-x-reverse md:flex-row md:space-x-2">
          {workspace && [WorkspaceRole.ADMIN, WorkspaceRole.OWNER].includes(workspace.role) && (
            <Dialog
              open={isOpen}
              onOpenChange={(isOpen) => {
                setIsOpen(isOpen);
                form.reset();
              }}
            >
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusIcon className="mr-0.5 h-4 w-4" />
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new invitation</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                  >
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="validAt"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel> Start date </FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, 'dd MMM yyyy')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="validUntil"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel> Expire date </FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, 'dd MMM yyyy')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit">Create</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
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
                  <TableRow key={row.id}>
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
