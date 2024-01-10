import { Button } from '@/components/common/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/common/select';
import { Editor } from '@/components/features/editor/editor';
import { useEditor } from '@/hooks/editor-hook';
import { useProblemPane } from '@/hooks/problem-pane-hook';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useToast } from '@/hooks/toast-hook';
import { useCreateSubmission } from '@/hooks/workspace-hook';
import { Loader2Icon, SettingsIcon } from 'lucide-react';
import { useState } from 'react';

export const EditorPane = () => {
  const { workspaceId, assignmentId } = useWorkspaceParams();

  const { toast } = useToast();
  const { setTab } = useProblemPane();
  const [isDisable, setIsDisable] = useState(false);

  const { getCode, getLanguage, setLanguage } = useEditor();
  const { mutate: submit, isPending: isSubmitting } = useCreateSubmission(
    workspaceId,
    assignmentId,
  );

  const handleSubmit = () => {
    const code = getCode();
    if (!code) {
      return toast({
        variant: 'danger',
        title: 'Try to write some codes',
        description: 'It looks like your editor is empty',
      });
    }
    submit({ code, language: getLanguage() });
    setTab('submission');
    setIsDisable(true);
    setTimeout(() => setIsDisable(false), 2000);
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <Editor />

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row space-x-2">
          <Button
            size="sm"
            variant="outline"
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
          <Select
            defaultValue="c"
            onValueChange={setLanguage}
          >
            <SelectTrigger className="h-9 w-32 focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={isDisable}
        >
          {isSubmitting && <Loader2Icon className="mr-2 h-3 w-3 animate-spin" />}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EditorPane;
