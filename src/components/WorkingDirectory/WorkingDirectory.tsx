import React from 'react';

import FileBrowser from '../FileBrowser/FileBrowser';

import styles from './WorkingDirectory.module.css';
import WorkingDirectoryActions from './WorkingDirectoryActions';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';

type WorkingDirectoryProps = {
  className?: string;
};

const WorkingDirectory: React.FC<WorkingDirectoryProps> = ({ className }) => {
  return (
    <section
      className={`${styles.workingDirectory} ${className ? className : ''}`}
    >
      <WorkingDirectoryActions />
      <Breadcrumbs />
      <FileBrowser />
    </section>
  );
};

export default WorkingDirectory;
