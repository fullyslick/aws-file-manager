import React from 'react';

import classes from './WorkingDirectory.module.css';
import WorkingDirectoryActions from './WorkingDirectoryActions';
import WorkingDirectoryBrowser from './WorkingDirectoryBrowser';

type WorkingDirectoryProps = {
  className?: string;
};

const WorkingDirectory: React.FC<WorkingDirectoryProps> = ({ className }) => {
  return (
    <div
      className={`${classes['working-directory']} ${
        className ? className : ''
      }`}
    >
      <WorkingDirectoryActions />
      <WorkingDirectoryBrowser />
    </div>
  );
};

export default WorkingDirectory;
