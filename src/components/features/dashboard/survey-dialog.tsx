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
    <div className="container flex flex-col items-center justify-center ">
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
          form.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="inline-flex animate-pulse items-center rounded-full border-none bg-muted px-3 py-1 text-sm font-medium text-primary shadow hover:animate-none hover:text-primary"
          >
            We are now on early access, We need your feedback 😘
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>💖 Thank you for participating</DialogTitle>
            <DialogDescription>
              Your valuable feedback will help us enhance and improve our platform to better meet
              your needs.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
            </form>
          </Form>
          <DialogFooter>
            <Button
              type="submit"
              size="sm"
            >
              {isSubmitting && <Loader2Icon className="mr-2 h-3 w-3 animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
