import React from 'react';

import Button from '../UI/Button/Button';

import classes from './WorkingDirectoryActions.module.css';

type WorkingDirActionsProps = {
  className?: string;
};

const WorkingDirActions: React.FC<WorkingDirActionsProps> = ({ className }) => {
  const handleCreateFolder = () => {};

  return (
    <div
      className={`${classes['working-directory-actions']} ${
        className ? className : ''
      }`}
    >
      <Button type='button'>+ Folder</Button>
      <Button type='button'>+ File</Button>
      <Button type='button' disabled>
        Delete Selected
      </Button>
    </div>
  );
};

export default WorkingDirActions;
