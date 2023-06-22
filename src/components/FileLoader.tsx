import React from 'react';

const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;

const FileLoader: React.FC = () => {
  const handleObjectList = () => {
    console.log('Should list objects in bucket');
  };

  return (
    <div>
      Results:
      <button onClick={handleObjectList}>List Objects</button>
    </div>
  );
};

export default FileLoader;
