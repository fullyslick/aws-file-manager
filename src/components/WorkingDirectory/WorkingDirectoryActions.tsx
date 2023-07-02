import React from 'react';

import CreateFolder from '../Actions/CreateFolder';
import CreateFile from '../Actions/CreateFile';
import DeleteSelected from '../Actions/DeleteSelected';

import styles from './WorkingDirectoryActions.module.css';

type WorkingDirActionsProps = {
  className?: string;
};

const WorkingDirActions: React.FC<WorkingDirActionsProps> = ({ className }) => {
  return (
    <div
      className={`${styles.workingDirectoryActions} ${
        className ? className : ''
      }`}
    >
      <CreateFolder className={styles.workingDirectoryAction} />
      <CreateFile className={styles.workingDirectoryAction} />
      <DeleteSelected className={styles.workingDirectoryAction} />
    </div>
  );
};

export default WorkingDirActions;
