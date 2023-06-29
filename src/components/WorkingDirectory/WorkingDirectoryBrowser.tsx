import React, { useEffect, useContext } from 'react';

import { WorkingDirContext } from '../../contexts/WorkingDirContext';
import { ConfigContext } from '../../contexts/ConfigContext';
import { getS3Objects } from '../../services/aws-methods';

import classes from './WorkingDirectoryBrowser.module.css';

type WorkingDirectoryBrowserProps = {
  className?: string;
};

const WorkingDirectoryBrowser: React.FC<WorkingDirectoryBrowserProps> = ({
  className,
}) => {
  const { workingDir } = useContext(WorkingDirContext);
  const { configData } = useContext(ConfigContext);

  useEffect(() => {
    console.log('Working dir changed! Fetch data for: ' + workingDir);

    const getAwsData = async () => {
      try {
        const s3Objects = await getS3Objects(configData, workingDir);
        console.log(s3Objects);
        // if (s3Objects.length) {
        //   setBrowserNodes(s3Objects);
        // } else {
        //   setBrowserNodes([]);
        //   throw new Error('There is no data found!');
        // }
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
      <div>Content</div>
    </div>
  );
};

export default WorkingDirectoryBrowser;
