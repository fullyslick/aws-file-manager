import React, { useEffect, useContext, useState } from 'react';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';
import { ConfigContext } from '../../contexts/ConfigContext';
import { getS3Objects } from '../../services/aws-methods';

import { BrowserNode } from '../../types/browser.types';
import classes from './WorkingDirectoryBrowser.module.css';

type WorkingDirectoryBrowserProps = {
  className?: string;
};

const WorkingDirectoryBrowser: React.FC<WorkingDirectoryBrowserProps> = ({
  className,
}) => {
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
    <div
      className={`${classes['working-directory-browser']} ${
        className ? className : ''
      }`}
    >
      {browserNodes.length !== 0 ? (
        <div>
          {browserNodes.map((browserNode) => (
            <li key={browserNode.path}>
              <input
                type='checkbox'
                onChange={() => {}}
                data-item-key={browserNode.path}
              />
              <span style={{ color: browserNode.isFolder ? 'blue' : 'black' }}>
                {browserNode.name}
              </span>
            </li>
          ))}
        </div>
      ) : (
        <p>Empty Folder</p>
      )}
    </div>
  );
};

export default WorkingDirectoryBrowser;
