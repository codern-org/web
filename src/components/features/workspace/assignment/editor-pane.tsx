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
import { useProblemPane } from '@/hooks/problem-pane-hook';
import { useCreateSubmissionQuery } from '@/hooks/workspace-hook';
import { Loader2Icon, SettingsIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const EditorPane = () => {
  const { workspaceId, assignmentId } = useParams();
  const { setTab } = useProblemPane();
  const { submit, isSubmitting } = useCreateSubmissionQuery(
    Number(workspaceId),
    Number(assignmentId),
  );

  const handleSubmit = () => {
    submit();
    setTab('submission');
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
          <Select defaultValue="c">
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
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className="mr-2 h-3 w-3 animate-spin" />}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EditorPane;
