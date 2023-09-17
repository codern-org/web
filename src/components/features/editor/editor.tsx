import '@/assets/css/monaco.css';

import { useEditor } from '@/hooks/editor-hook';
import MonacoEditorComponent from '@monaco-editor/react';

export const Editor = () => {
  const { options, onMount } = useEditor();

  return (
    <MonacoEditorComponent
      options={options}
      onMount={onMount}
      className="overflow-hidden rounded-md border"
    />
  );
};
