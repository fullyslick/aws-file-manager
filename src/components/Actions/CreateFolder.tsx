import React from 'react';

import Button from '../UI/Button/Button';

import classes from './CreateFolder.module.css';
import { ReactComponent as PlusSVG } from '../../assets/plus.svg';

type CreateFolderProps = {
  className?: string;
};

const CreateFolder: React.FC<CreateFolderProps> = ({
  className,
}: CreateFolderProps) => {
  return (
    <Button type='button' className={className}>
      <PlusSVG className={classes['actions--icon']} onClick={() => {}} />
      Folder
    </Button>
  );
};

export default CreateFolder;
