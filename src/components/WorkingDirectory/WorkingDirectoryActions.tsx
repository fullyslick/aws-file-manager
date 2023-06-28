import React from 'react';

import classes from './WorkingDirectoryActions.module.css';

type WorkingDirActionsProps = {
  className?: string;
};

const WorkingDirActions: React.FC<WorkingDirActionsProps> = ({ className }) => {
  return (
    <div className={`${classes['working-directory-actions']} ${className}`}>
      <div>Actions</div>
    </div>
  );
};

export default WorkingDirActions;
