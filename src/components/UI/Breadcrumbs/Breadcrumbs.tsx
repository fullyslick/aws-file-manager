import React, { useContext, useEffect, useState } from 'react';

import { WorkingDirContext } from '../../../contexts/WorkingDirContext';

import { ReactComponent as RightArrowSVG } from '../../../assets/arrow-right-delimiter.svg';
import classes from './Breadcrumbs.module.css';

type BreadcrumbsProps = {
  className?: string;
};

type BreadcrumbsShape = {
  name: string;
  path: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const { workingDir, setWorkingDir } = useContext(WorkingDirContext);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsShape[]>([]);

  useEffect(() => {
    var path = workingDir.split('/');

    // Remove the last empty element from the path array
    path.pop();

    // Generate breadcrumbs by accumulating the path
    const breadcrumbsData = path
      .map((_, index) => {
        let accumulatedPath = path.slice(0, index + 1);
        return accumulatedPath.join('/') + '/';
      })
      .map((breadcrumb) => {
        return {
          name: breadcrumb.split('/').slice(-2).join(''),
          path: breadcrumb,
        };
      });

    breadcrumbsData.unshift({
      name: 'root',
      path: '',
    });

    setBreadcrumbs(breadcrumbsData);
  }, [workingDir]);

  const handleBreadcrumbNav = (path: string) => {
    setWorkingDir(path);
  };

  return (
    <div className={`${classes['breadcrumbs']} ${className ? className : ''}`}>
      {breadcrumbs.length > 0 &&
        breadcrumbs.map((breadcrumb) => (
          <button
            key={breadcrumb.path}
            className={classes['breadcrumb__item']}
            type='button'
            onClick={() => handleBreadcrumbNav(breadcrumb.path)}
          >
            {breadcrumb.name}
            <RightArrowSVG className={classes['breadcrumb__item-icon']} />
          </button>
        ))}
    </div>
  );
};

export default Breadcrumbs;
