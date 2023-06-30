import React, { useContext, useState } from 'react';

import Button from '../UI/Button/Button';

import { ReactComponent as TrashSVG } from '../../assets/trash.svg';

type DeleteSelectedProps = {
  className?: string;
};

const DeleteSelected: React.FC<DeleteSelectedProps> = ({
  className,
}: DeleteSelectedProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isDisabled = isLoading; // and has items

  const handleDeleteSelected = () => {
    console.log('delete selected');
  };

  return (
    <>
      <Button
        type='button'
        className={className}
        isLoading={isLoading}
        disabled={isDisabled}
        onClick={handleDeleteSelected}
      >
        <TrashSVG />
        Delete
      </Button>
    </>
  );
};

export default DeleteSelected;
