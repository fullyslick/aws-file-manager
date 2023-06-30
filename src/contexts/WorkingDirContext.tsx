import React, { createContext, useState } from 'react';

interface WorkingDirType {
  workingDir: string;
  lastModified: string;
  setWorkingDir: React.Dispatch<React.SetStateAction<string>>;
  setLastModified: React.Dispatch<React.SetStateAction<string>>;
}

const WorkingDirContext = createContext<WorkingDirType>({
  workingDir: '',
  lastModified: '',
  setWorkingDir: () => {},
  setLastModified: () => {},
});

interface WorkingDirProviderProps {
  children: React.ReactNode;
}

const WorkingDirProvider: React.FC<WorkingDirProviderProps> = ({
  children,
}) => {
  const [workingDir, setWorkingDir] = useState<string>('');
  const [lastModified, setLastModified] = useState<string>('');

  return (
    <WorkingDirContext.Provider
      value={{ workingDir, setWorkingDir, lastModified, setLastModified }}
    >
      {children}
    </WorkingDirContext.Provider>
  );
};

export { WorkingDirContext, WorkingDirProvider };
