import { Input } from '@/common/components/Input';
import { useWorkspaceAction } from '@/stores/WorkspaceStore';
import { Label } from '@radix-ui/react-label';
import { SearchIcon } from 'lucide-react';

export const SearchWorkspaceInput = () => {
  const workspaceAction = useWorkspaceAction();

  return (
    <Label className="relative">
      <SearchIcon
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 transform"
      />
      <Input
        type="search"
        placeholder="Search workspace"
        className="pl-8"
        onChange={(event) => workspaceAction.filter(event.target.value)}
      />
    </Label>
  );
};
SearchWorkspaceInput.displayName = 'SearchWorkspaceInput';
