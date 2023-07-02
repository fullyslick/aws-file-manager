import React from 'react';

import Button from '../UI/Button/Button';

import useModal from '../../hooks/useModal';

import CreateFileDialog from '../Dialogs/CreateFileDialog/CreateFileDialog';

import { ReactComponent as PlusSVG } from '../../assets/plus.svg';

type CreateFileProps = {
  className?: string;
};

const CreateFile: React.FC<CreateFileProps> = ({
  className,
}: CreateFileProps) => {
  const { isShown, toggle } = useModal();

  return (
    <>
      <Button type='button' className={className} onClick={toggle}>
        <PlusSVG />
        File
      </Button>
      {isShown && <CreateFileDialog isShown={isShown} toggle={toggle} />}
    </>
  );
};

export default CreateFile;
