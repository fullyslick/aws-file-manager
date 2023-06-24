import React from 'react';

import FolderTreeList from './components/FolderTree/FolderTree';
import './App.css';

import FileLoader from './components/FileLoader';

function App() {
  return (
    <div className='App'>
      <FileLoader />
      <FolderTreeList />
    </div>
  );
}

export default App;
