import '@/assets/css/monaco.css';

import { useEditor } from '@/hooks/editor-hook';
import MonacoEditorComponent from '@monaco-editor/react';

export const Editor = () => {
  const { options, onMount } = useEditor();

  return (
    <div className="h-full overflow-hidden">
      <MonacoEditorComponent
        options={options}
        onMount={onMount}
        className="overflow-hidden rounded-md border"
      />
    </div>
  );
};
