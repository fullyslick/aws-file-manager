import React from 'react';

import CreateFolder from '../Actions/CreateFolder';
import CreateFile from '../Actions/CreateFile';
import DeleteSelected from '../Actions/DeleteSelected';

import classes from './WorkingDirectoryActions.module.css';

type WorkingDirActionsProps = {
  className?: string;
};

const WorkingDirActions: React.FC<WorkingDirActionsProps> = ({ className }) => {
  return (
    <div
      className={`${classes['working-directory-actions']} ${
        className ? className : ''
      }`}
    >
      <CreateFolder className={classes['working-directory-action']} />
      <CreateFile className={classes['working-directory-action']} />
      <DeleteSelected className={classes['working-directory-action']} />
    </div>
  );
};

export default WorkingDirActions;
