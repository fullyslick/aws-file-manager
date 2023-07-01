import React, { useContext, useState } from 'react';

import { SelectedFilesContext } from '../../contexts/SelectedFilesContext';
import { ConfigContext } from '../../contexts/ConfigContext';
import { WorkingDirContext } from '../../contexts/WorkingDirContext';

import useModal from '../../hooks/useModal';

import { deleteS3Objects } from '../../services/aws-methods';

import ErrorDialog from '../Dialogs/ErrorDialog/ErrorDialog';
import Button from '../UI/Button/Button';

import { ReactComponent as TrashSVG } from '../../assets/trash.svg';

type DeleteSelectedProps = {
  className?: string;
};

const DeleteSelected: React.FC<DeleteSelectedProps> = ({
  className,
}: DeleteSelectedProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedFiles } = useContext(SelectedFilesContext);
  const { configData } = useContext(ConfigContext);
  const { setLastModified } = useContext(WorkingDirContext);

  const { isShown, toggle } = useModal();

  const isDisabled = isLoading || !selectedFiles.length;

  const handleDeleteSelected = async () => {
    setIsLoading(true);
    try {
      await deleteS3Objects(configData, selectedFiles);
      setLastModified(new Date().toISOString());
    } catch (error) {
      console.error(error);
      toggle();
    } finally {
      setIsLoading(false);
    }
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
      {isShown && (
        <ErrorDialog
          isShown={isShown}
          toggle={toggle}
          headerText='Unable to delete files'
        />
      )}
    </>
  );
};

export default DeleteSelected;
