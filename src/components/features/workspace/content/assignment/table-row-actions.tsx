import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/common/alert-dialog';
import { Button } from '@/components/common/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/dropdown';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useDeleteAssignment } from '@/hooks/workspace-hook';
import { Assignment } from '@/types/workspace-type';
import { Row } from '@tanstack/react-table';
import { MoreHorizontalIcon } from 'lucide-react';

type AssignmentTableRowActionsProps = {
  row: Row<Assignment>;
};

export const AssignmentTableRowActions = ({ row }: AssignmentTableRowActionsProps) => {
  const { workspaceId } = useWorkspaceParams();
  const { mutate: deleteAssignment } = useDeleteAssignment(workspaceId, row.original.id);

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
        >
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-danger focus:bg-danger focus:text-white">
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this assignment from your workspace
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteAssignment()}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
