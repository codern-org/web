import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Input } from '@/components/common/input';
import { Separator } from '@/components/common/separator';
import { Textarea } from '@/components/common/textarea';
import { useForm } from 'react-hook-form';

export const WorkspaceGeneralSettings = () => {
  const form = useForm();

  return (
    <>
      <h3 className="mb-2 text-lg font-medium">General</h3>
      <Separator className="mb-6" />
      <div className="space-y-8">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace detail</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: add workspace image upload */}
            <Button>Save Change</Button>
          </form>
        </Form>
        <div className="space-y-4 rounded-md border border-danger p-4">
          <div className="text-lg font-semibold text-danger">Danger zone</div>
          <div className="font-medium">Delete this workspace</div>
          <div className="text-muted-foreground">
            This action cannot be undone. This will permanently delete your workspace and remove
            your data from our servers. Please be certain.
          </div>
          <Button variant="danger"> Delete this workspace </Button>
        </div>
      </div>
    </>
  );
};
