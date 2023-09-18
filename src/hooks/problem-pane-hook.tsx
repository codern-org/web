import { ReactNode, createContext, useContext, useState } from 'react';

type ProblemPaneProviderProps = {
  children: ReactNode;
};

export type ProblemPaneTabs = 'problem' | 'submission' | 'problem';

type ProblemPaneProviderState = {
  tab: ProblemPaneTabs;
  setTab: (tab: ProblemPaneTabs) => void;
};

const initialState: ProblemPaneProviderState = {
  tab: 'problem',
  setTab: () => {},
};

const ProblemPaneProviderContext = createContext<ProblemPaneProviderState>(initialState);

export const ProblemPaneProvider = ({ children }: ProblemPaneProviderProps) => {
  const [tab, setTab] = useState<ProblemPaneTabs>('problem');

  const value = {
    tab: tab,
    setTab: setTab,
  };

  return (
    <ProblemPaneProviderContext.Provider value={value}>
      {children}
    </ProblemPaneProviderContext.Provider>
  );
};

export const useProblemPane = () => {
  const context = useContext(ProblemPaneProviderContext);
  if (!context) throw new Error('useProblemPane must be used within a ProblemPaneProvider');
  return context;
};
