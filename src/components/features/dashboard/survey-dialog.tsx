import { Button } from '@/components/common/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Textarea } from '@/components/common/textarea';
import { useStrictForm } from '@/hooks/form-hook';
import { useCreateSurvey } from '@/hooks/survey-hook';
import {
  SurveyFormDefaultValues,
  SurveyFormSchema,
  SurveyFormSchemaValues,
} from '@/types/schema/survey-schema';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

export const SurveyDialog = () => {
  const form = useStrictForm(SurveyFormSchema, SurveyFormDefaultValues);
  const { mutate: submit, isPending: isSubmitting } = useCreateSurvey();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: SurveyFormSchemaValues) => {
    submit(data.message);
    setIsOpen(false);
    form.reset();
  };

  return (
    <div className="mb-4 flex flex-col items-start justify-center lg:container lg:items-center">
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
          form.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            size="sm"
            className="inline-flex animate-pulse items-center rounded-full border-none bg-muted bg-gradient-to-br from-neutral-800 to-neutral-400 p-0.5 text-sm font-medium text-primary shadow-md hover:animate-none hover:text-primary focus:outline-none"
          >
            <div className="flex h-full items-center justify-between rounded-full bg-accent px-3">
              We are now on early access, We need your feedback 😘
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>💖 Thank you for participating</DialogTitle>
                <DialogDescription>
                  Your valuable feedback will help us enhance and improve our platform to better
                  meet your needs.
                </DialogDescription>
              </DialogHeader>
              <div className="my-4">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How can we improve?</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  size="sm"
                >
                  {isSubmitting && <Loader2Icon className="mr-2 h-3 w-3 animate-spin" />}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
