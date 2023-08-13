import { classNames } from '@/libs/Utils';

type DividerWithTextProps = {
  text: string;
  uppercase?: boolean;
};

export const DividerWithText = ({ uppercase, text }: DividerWithTextProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t"></span>
      </div>
      <div className={classNames('relative flex justify-center text-xs', uppercase && 'uppercase')}>
        <span className="bg-background px-2 text-muted-foreground">{text}</span>
      </div>
    </div>
  );
};
