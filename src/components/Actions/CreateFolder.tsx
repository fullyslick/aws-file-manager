import React from 'react';

import Button from '../UI/Button/Button';

import useModal from '../../hooks/useModal';

import CreateFolderDialog from '../Dialogs/CreateFolderDialog/CreateFolderDialog';

import { ReactComponent as PlusSVG } from '../../assets/plus.svg';

type CreateFolderProps = {
  className?: string;
};

const CreateFolder: React.FC<CreateFolderProps> = ({
  className,
}: CreateFolderProps) => {
  const { isShown, toggle } = useModal();

  return (
    <>
      <Button type='button' className={className} onClick={toggle}>
        <PlusSVG />
        Folder
      </Button>
      {isShown && <CreateFolderDialog isShown={isShown} toggle={toggle} />}
    </>
  );
};

export default CreateFolder;
