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
import { useDeleteWorkspaceParticipant } from '@/hooks/workspace-hook';
import { WorkspaceParticipant } from '@/types/workspace-type';
import { Row } from '@tanstack/react-table';
import { MoreHorizontalIcon } from 'lucide-react';

type AdminParticipantTableRowActionsProps = {
  row: Row<WorkspaceParticipant>;
};

export const AdminParticipantTableRowActions = ({ row }: AdminParticipantTableRowActionsProps) => {
  const { workspaceId } = useWorkspaceParams();
  const { mutate: deleteParticipant } = useDeleteWorkspaceParticipant(
    workspaceId,
    row.original.userId,
  );

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
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-danger focus:bg-danger focus:text-white">
              Remove
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove&nbsp;
            <span className="font-semibold">"{row.original.name}"</span> from your workspace
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="danger"
            onClick={() => deleteParticipant()}
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
