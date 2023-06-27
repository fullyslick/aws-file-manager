import React, { useContext } from 'react';

import ConfigBucket from './components/ConfigBucket/ConfigBucket';

import { ConfigContext } from './contexts/ConfigContext';

const App: React.FC = () => {
  const { hasConfig } = useContext(ConfigContext);

  return (
    <div className='app'>{hasConfig ? <p>Logged in</p> : <ConfigBucket />}</div>
  );
};

export default App;
