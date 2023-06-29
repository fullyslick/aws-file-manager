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

const delimiter = '?path=';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const { workingDir, setWorkingDir } = useContext(WorkingDirContext);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsShape[]>([]);

  useEffect(() => {
    var path = workingDir.split('/');

    // Remove the last empty element from the path array and cur
    path.pop();

    // Generate breadcrumbs by accumulating the path
    let breadcrumbsData = path
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

  const handleBreadcrumbNav = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const breadcrumbPath = (
      event.currentTarget as HTMLAnchorElement
    ).href.split(delimiter)[1];
    setWorkingDir(breadcrumbPath);
  };

  return (
    <div className={`${classes['breadcrumbs']} ${className ? className : ''}`}>
      {breadcrumbs.length > 0 &&
        breadcrumbs.map((breadcrumb) => (
          <a
            key={breadcrumb.path}
            href={`${delimiter}${breadcrumb.path}`}
            className={classes['breadcrumb-link']}
            type='button'
            onClick={handleBreadcrumbNav}
          >
            {breadcrumb.name}
            <RightArrowSVG className={classes['breadcrumb-link__icon']} />
          </a>
        ))}
    </div>
  );
};

export default Breadcrumbs;
