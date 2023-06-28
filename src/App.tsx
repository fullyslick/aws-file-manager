import React, { useContext } from 'react';

import ConfigBucket from './pages/ConfigBucket/ConfigBucket';
import BucketViewer from './pages/BucketViewer/BucketViewer';

import { ConfigContext } from './contexts/ConfigContext';

const App: React.FC = () => {
  const { hasConfig } = useContext(ConfigContext);

  return (
    <div className='app'>{hasConfig ? <BucketViewer /> : <ConfigBucket />}</div>
  );
};

export default App;
