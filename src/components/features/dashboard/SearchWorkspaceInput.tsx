import { Input } from '@/components/common/Input';
import { Label } from '@radix-ui/react-label';
import { SearchIcon } from 'lucide-react';

export const SearchWorkspaceInput = () => {
  return (
    <Label className="relative">
      <SearchIcon
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 transform"
      />
      <Input
        type="search"
        placeholder="Search workspace"
        className="h-9 py-0 pl-8"
        onChange={() => {}}
      />
    </Label>
  );
};
