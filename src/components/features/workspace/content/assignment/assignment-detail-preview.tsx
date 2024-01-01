import { Button } from '@/components/common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { Markdown } from '@/components/common/markdown';
import { EyeIcon } from 'lucide-react';

export type AssignmentDetailPreviewProps = {
  detail: string;
};

export const AssignmentDetailPreview = ({ detail }: AssignmentDetailPreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full"
        >
          <EyeIcon className="mr-1 h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-3/4 max-w-3xl flex-col">
        <DialogHeader>
          <DialogTitle className="mr-6 flex justify-between">Detail preview</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <Markdown markdown={detail} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
