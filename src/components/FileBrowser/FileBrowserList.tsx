import React from 'react';

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

export default BrowserList;
