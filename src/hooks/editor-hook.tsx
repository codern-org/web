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
  code?: string;
  cacheKey?: string;
  options?: MonacoEditorOptions;
  readOnly?: boolean;
  children: ReactNode;
};

type EditorProviderState = {
  editorRef: MonacoEditor | null;
  monacoRef: Monaco | null;
  onMount: (editor: MonacoEditor, monaco: Monaco) => void;
  options: MonacoEditorOptions;
  getCode: () => string;
  setCode: (code: string, language?: string) => void;
  getLanguage: () => string;
  setLanguage: (language: string) => void;
};

const EditorProviderContext = createContext<EditorProviderState | null>(null);

export const EditorProvider = ({
  code,
  cacheKey = '',
  options = initialOptions,
  readOnly = false,
  children,
}: EditorProviderProps) => {
  const { displayTheme } = useTheme();
  const editorRef = useRef<MonacoEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const getCurrentModel = () => {
    if (!editorRef.current) return null;
    return editorRef.current.getModel();
  };

  const getCode = () => {
    const model = getCurrentModel();
    if (!model) return '';
    return model.getValue();
  };

  const setCode = (code: string, language?: string) => {
    const model = getCurrentModel();
    if (!model || !monacoRef.current) return;
    model.setValue(code);
    if (language) setLanguage(language);
  };

  const getLanguage = () => {
    const model = getCurrentModel();
    if (!model) return '';
    return model.getLanguageId();
  };

  const setLanguage = (language: string) => {
    const model = getCurrentModel();
    if (!model || !monacoRef.current) return;
    monacoRef.current.editor.setModelLanguage(model, language);
    model.setValue(localStorage.getItem(`code-${getLanguage()}-${cacheKey}`) || '');
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
    const uri = monaco.Uri.file(Date.now().toString());
    const modelValue = code || localStorage.getItem(`code-c-${cacheKey}`) || '';
    const model = monaco.editor.createModel(modelValue, 'c', uri);
    editor.setModel(model);

    // TODO: propery way to save code
    model.onDidChangeContent(() => {
      localStorage.setItem(`code-${getLanguage()}-${cacheKey}`, model.getValue());
    });

    // Sync theme
    monaco.editor.setTheme(`vs-${displayTheme}`);
    editor.focus();
  };

  const value: EditorProviderState = {
    editorRef: editorRef.current,
    monacoRef: monacoRef.current,
    onMount,
    options: {
      ...options,
      readOnly,
    },
    getCode,
    setCode,
    getLanguage,
    setLanguage,
  };

  return <EditorProviderContext.Provider value={value}>{children}</EditorProviderContext.Provider>;
};

export const useEditor = () => {
  const context = useContext(EditorProviderContext);
  if (!context) throw new Error('useEditor must be used within a EditorProvider');
  return context;
};
