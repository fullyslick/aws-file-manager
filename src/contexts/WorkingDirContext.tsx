import React, { createContext, useState } from 'react';

interface WorkingDirType {
  workingDir: string;
  setWorkingDir: React.Dispatch<React.SetStateAction<string>>;
}

const WorkingDirContext = createContext<WorkingDirType>({
  workingDir: '',
  setWorkingDir: () => {},
});

interface WorkingDirProviderProps {
  children: React.ReactNode;
}

const WorkingDirProvider: React.FC<WorkingDirProviderProps> = ({
  children,
}) => {
  const [workingDir, setWorkingDir] = useState<string>('');

  return (
    <WorkingDirContext.Provider value={{ workingDir, setWorkingDir }}>
      {children}
    </WorkingDirContext.Provider>
  );
};

export { WorkingDirContext, WorkingDirProvider };
