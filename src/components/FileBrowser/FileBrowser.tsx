import React, { useEffect, useContext, useState } from 'react';

import FileBrowserList from './FileBrowserList';
import ErrorDialog from '../Dialogs/ErrorDialog/ErrorDialog';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';
import { ConfigContext } from '../../contexts/ConfigContext';

import useModal from '../../hooks/useModal';

import { getS3Objects } from '../../services/aws-methods';

import { BrowserNode } from '../../types/browser.types';
import classes from './FileBrowser.module.css';

type FileBrowserProps = {
  className?: string;
};

const FileBrowser: React.FC<FileBrowserProps> = ({ className }) => {
  const { workingDir, lastModified } = useContext(WorkingDirContext);
  const { configData } = useContext(ConfigContext);
  const [browserNodes, setBrowserNodes] = useState<BrowserNode[] | []>([]);
  const { isShown, toggle } = useModal();
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const getAwsData = async () => {
      if (hasError) {
        setHasError(false);
      }

      try {
        const s3Objects = await getS3Objects(configData, workingDir);
        if (s3Objects.length) {
          setBrowserNodes(s3Objects);
        } else {
          setBrowserNodes([]);
        }
      } catch (error) {
        console.error(error);
        setHasError(true);
        toggle();
      }
    };

    getAwsData();
  }, [workingDir, configData, lastModified]);

  return (
    <div className={`${classes['file-browser']} ${className ? className : ''}`}>
      {browserNodes.length !== 0 ? (
        <FileBrowserList browserNodes={browserNodes} />
      ) : (
        <p className={classes['file-browser__empty-msg']}>
          {hasError ? (
            <span>Failed to fetch</span>
          ) : (
            <span>This folder is empty.</span>
          )}
        </p>
      )}
      {hasError && (
        <ErrorDialog
          headerText='Unable to retrieve data!'
          isShown={isShown}
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default FileBrowser;
