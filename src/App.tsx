import React from 'react';

import ConfigBucket from './components/ConfigBucket/ConfigBucket';
import FolderTreeList from './components/FolderTree/FolderTree';

import FileLoader from './components/FileLoader';

function App() {
  return (
    <div className='app'>
      <ConfigBucket />
      {/* <FileLoader />
      <FolderTreeList /> */}
    </div>
  );
}

export default App;
