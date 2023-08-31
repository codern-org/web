import { Input, InputProps } from '@/components/common/input';
import { Label } from '@/components/common/label';
import { classNames } from '@/libs/utils';
import { SearchIcon } from 'lucide-react';

export const SearchInput = ({ className, ...props }: InputProps) => {
  return (
    <Label className="relative">
      <SearchIcon
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 transform"
      />
      <Input
        type="search"
        className={classNames('pl-8', className)}
        {...props}
      />
    </Label>
  );
};
