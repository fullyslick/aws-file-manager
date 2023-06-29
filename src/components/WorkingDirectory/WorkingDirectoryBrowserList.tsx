import React from 'react';

import { FolderTreeInterface } from '../../types/folder-tree.types';
import { BrowserNodesInterface } from '../../types/browser.types';

import classes from './WorkingDirectoryBrowserList.module.css';

type WorkingDirectoryBrowserListProps = {
  className?: string;
  browserNodes: BrowserNodesInterface | [];
};

const WorkingDirectoryBrowserList: React.FC<
  WorkingDirectoryBrowserListProps
> = ({ className, browserNodes }) => {
  console.log(browserNodes.length);

  return (
    <ul>
      {browserNodes.length > 0
        ? browserNodes.map((browserNode) => (
            <li key={browserNode.path}>
              <input
                type='checkbox'
                onChange={() => {}}
                data-item-key={browserNode.path}
              />
              <span style={{ color: browserNode.isFolder ? 'blue' : 'black' }}>
                {browserNode.name}
              </span>
            </li>
          ))
        : null}
    </ul>
  );
};

export default WorkingDirectoryBrowserList;
