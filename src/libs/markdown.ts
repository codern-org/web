import 'katex/dist/katex.min.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import KatexPlugin from '@vscode/markdown-it-katex';

import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';

export const markdownIt = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
});

markdownIt.use(KatexPlugin);

export const renderMarkdown = (string: string) => {
  const dirty = markdownIt.render(string);
  const clean = DOMPurify.sanitize(dirty);
  return clean;
};
