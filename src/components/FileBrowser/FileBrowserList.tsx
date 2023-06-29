import React from 'react';

import FileBrowserItem from './FileBrowserItem';

import { BrowserNodesInterface } from '../../types/browser.types';

import classes from './FileBrowserList.module.css';

type BrowserListProps = {
  className?: string;
  browserNodes: BrowserNodesInterface | [];
};

const BrowserList: React.FC<BrowserListProps> = ({
  className,
  browserNodes,
}) => {
  return (
    <ul
      className={`${classes['file-browser-list']} ${
        className ? className : ''
      }`}
    >
      {browserNodes.length > 0
        ? browserNodes.map((browserNode) => (
            <FileBrowserItem key={browserNode.path} browserNode={browserNode} />
          ))
        : null}
    </ul>
  );
};

export default BrowserList;
