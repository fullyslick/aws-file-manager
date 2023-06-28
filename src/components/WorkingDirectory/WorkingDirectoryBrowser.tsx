import React from 'react';

import classes from './WorkingDirectoryBrowser.module.css';

type WorkingDirectoryBrowserProps = {
  className?: string;
};

const WorkingDirectoryBrowser: React.FC<WorkingDirectoryBrowserProps> = ({
  className,
}) => {
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
