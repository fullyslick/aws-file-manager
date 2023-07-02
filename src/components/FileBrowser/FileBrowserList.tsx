import React, { useCallback, useContext, useEffect } from 'react';

import FileBrowserItem from './FileBrowserItem';

import { SelectedFilesContext } from '../../contexts/SelectedFilesContext';
import { WorkingDirContext } from '../../contexts/WorkingDirContext';

import { BrowserNodesInterface } from '../../types/browser.types';

type BrowserListProps = {
  className?: string;
  browserNodes: BrowserNodesInterface | [];
};

const BrowserList: React.FC<BrowserListProps> = ({
  className,
  browserNodes,
}) => {
  const { setSelectedFiles } = useContext(SelectedFilesContext);
  const { workingDir, setWorkingDir } = useContext(WorkingDirContext);

  // When folder is clicked reset selected files
  useEffect(() => {
    setSelectedFiles([]);
  }, [workingDir, setSelectedFiles]);

  const handleCheckBoxChange = useCallback(
    (isChecked: boolean, checkedPath: string) => {
      if (isChecked) {
        setSelectedFiles((prevState) => [...prevState, checkedPath]);
        return;
      }

      setSelectedFiles((prevState) => {
        return prevState.filter(
          (prevStateItem) => prevStateItem !== checkedPath
        );
      });
    },
    [setSelectedFiles]
  );

  const handleFileItemClick = useCallback(
    (path: string) => {
      setWorkingDir(path);
    },
    [setWorkingDir]
  );

  const fileBrowserListClassName = className || '';

  return (
    <ul
      {...(fileBrowserListClassName
        ? { className: fileBrowserListClassName }
        : {})}
    >
      {browserNodes.length > 0
        ? browserNodes.map((browserNode) => (
            <FileBrowserItem
              key={browserNode.path}
              onClick={handleFileItemClick}
              onCheckboxChange={handleCheckBoxChange}
              browserNode={browserNode}
            />
          ))
        : null}
    </ul>
  );
};

export default BrowserList;
