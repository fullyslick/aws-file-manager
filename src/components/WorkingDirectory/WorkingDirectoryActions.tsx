import React from 'react';

import Button from '../UI/Button/Button';
import CreateFolder from '../Actions/CreateFolder';
import CreateFile from '../Actions/CreateFile';

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
      <CreateFolder className={classes['working-directory-action']} />
      <CreateFile className={classes['working-directory-action']} />
      <Button type='button'>
        <TrashSVG className={classes['working-directory-actions--icon']} />
        Delete
      </Button>
    </div>
  );
};

export default WorkingDirActions;
