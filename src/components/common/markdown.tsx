import { renderMarkdown } from '@/libs/markdown';
import { classNames } from '@/libs/utils';
import { HTMLAttributes } from 'react';

type MarkdownProps = {
  markdown: string;
} & HTMLAttributes<HTMLElement>;

export const Markdown = ({ markdown, className, ...props }: MarkdownProps) => {
  return (
    <article
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
      className={classNames('prose prose-zinc relative dark:prose-invert', className)}
      {...props}
    />
  );
};
