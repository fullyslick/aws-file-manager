import React, { useEffect, useContext, useState } from 'react';

import FileBrowserList from './FileBrowserList';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';
import { ConfigContext } from '../../contexts/ConfigContext';
import { getS3Objects } from '../../services/aws-methods';

import { BrowserNode } from '../../types/browser.types';
import classes from './FileBrowser.module.css';

type FileBrowserProps = {
  className?: string;
};

const FileBrowser: React.FC<FileBrowserProps> = ({ className }) => {
  const { workingDir } = useContext(WorkingDirContext);
  const { configData } = useContext(ConfigContext);
  const [browserNodes, setBrowserNodes] = useState<BrowserNode[] | []>([]);

  useEffect(() => {
    const getAwsData = async () => {
      try {
        const s3Objects = await getS3Objects(configData, workingDir);
        if (s3Objects.length) {
          setBrowserNodes(s3Objects);
        } else {
          setBrowserNodes([]);
          throw new Error('There is no data found!');
        }
      } catch (error) {
        // Should notify UI
        console.log(error);
      }
    };

    getAwsData();
  }, [workingDir, configData]);

  return (
    <div className={`${classes['file-browser']} ${className ? className : ''}`}>
      {browserNodes.length !== 0 ? (
        <FileBrowserList browserNodes={browserNodes} />
      ) : (
        <p>Empty Folder</p>
      )}
    </div>
  );
};

export default FileBrowser;