import React, { createContext, useState } from 'react';

interface SelectedFilesType {
  selectedFiles: string[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectedFilesContext = createContext<SelectedFilesType>({
  selectedFiles: [],
  setSelectedFiles: () => {},
});

interface SelectedFilesProviderProps {
  children: React.ReactNode;
}

const SelectedFilesProvider: React.FC<SelectedFilesProviderProps> = ({
  children,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  return (
    <SelectedFilesContext.Provider value={{ selectedFiles, setSelectedFiles }}>
      {children}
    </SelectedFilesContext.Provider>
  );
};

export { SelectedFilesContext, SelectedFilesProvider };
