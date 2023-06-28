import React from 'react';

import Button from '../UI/Button/Button';

import { ReactComponent as TrashSVG } from '../../assets/trash.svg';
import { ReactComponent as PlusSVG } from '../../assets/plus.svg';
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
      <Button type='button'>
        <PlusSVG className={classes['working-directory-actions--icon']} />
        Folder
      </Button>
      <Button type='button'>
        <PlusSVG className={classes['working-directory-actions--icon']} />
        File
      </Button>
      <Button type='button'>
        <TrashSVG className={classes['working-directory-actions--icon']} />
        Delete
      </Button>
    </div>
  );
};

export default WorkingDirActions;
