import { useTheme } from '@/hooks/theme-hook';
import { Monaco, MonacoEditor, MonacoEditorOptions } from '@/libs/monaco';
import { ReactNode, createContext, useContext, useEffect, useRef } from 'react';

const initialOptions: MonacoEditorOptions = {
  // Layouting
  automaticLayout: true,

  // Quality of life
  mouseWheelZoom: true,

  // Override default
  fontSize: 14,
  fontFamily: "'Jetbrains Mono', Menlo, Monaco, 'Courier New', monospace",
  cursorSmoothCaretAnimation: 'on',
  smoothScrolling: true,
  minimap: { enabled: false },

  model: null, // Manually set initial model
};

type EditorProviderProps = {
  children: ReactNode;
};

type EditorProviderState = {
  editorRef: MonacoEditor | null;
  monacoRef: Monaco | null;
  onMount: (editor: MonacoEditor, monaco: Monaco) => void;
  options: MonacoEditorOptions;
  getCode: () => string;
  getLanguage: () => string;
};

const initialState: EditorProviderState = {
  editorRef: null,
  monacoRef: null,
  onMount: () => {},
  options: {},
  getCode: () => '',
  getLanguage: () => '',
};

const EditorProviderContext = createContext<EditorProviderState>(initialState);

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const { displayTheme } = useTheme();
  const editorRef = useRef<MonacoEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // TODO: better manipulation
  const options = initialOptions;

  const getCurrentModel = () => {
    if (!editorRef.current) return null;
    return editorRef.current.getModel();
  };

  const getCode = () => {
    const model = getCurrentModel();
    if (!model) return '';
    return model.getValue();
  };

  const getLanguage = () => {
    const model = getCurrentModel();
    if (!model) return '';
    return model.getLanguageId();
  };

  // Sync theme after monaco has initialized
  useEffect(() => {
    if (!monacoRef.current) return;
    monacoRef.current.editor.setTheme(`vs-${displayTheme}`);
  }, [monacoRef, displayTheme]);

  // For `@monaco-editor/react` onMount function
  const onMount = (editor: MonacoEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    // Set initial model
    const model = monaco.editor.createModel('', 'c', monaco.Uri.file('/main'));
    editor.setModel(model);
    // Sync theme
    monaco.editor.setTheme(`vs-${displayTheme}`);
    editor.focus();
  };

  const value = {
    editorRef: editorRef.current,
    monacoRef: monacoRef.current,
    onMount: onMount,
    options: options,
    getCode: getCode,
    getLanguage: getLanguage,
  };

  return <EditorProviderContext.Provider value={value}>{children}</EditorProviderContext.Provider>;
};

export const useEditor = () => {
  const context = useContext(EditorProviderContext);
  if (!context) throw new Error('useEditor must be used within a EditorProvider');
  return context;
};
