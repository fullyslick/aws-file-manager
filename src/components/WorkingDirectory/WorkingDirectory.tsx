import React from 'react';

import FileBrowser from '../FileBrowser/FileBrowser';

import classes from './WorkingDirectory.module.css';
import WorkingDirectoryActions from './WorkingDirectoryActions';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';

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
      <Breadcrumbs />
      <FileBrowser />
    </div>
  );
};

export default WorkingDirectory;
