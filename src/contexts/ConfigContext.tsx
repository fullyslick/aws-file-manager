import React, { createContext, useState } from 'react';

import { ConfigCredentialsInterface } from '../types/config-context.types';

import { getS3Objects } from '../services/aws-methods';

interface ConfigContextDataInterface {
  configData: ConfigCredentialsInterface;
  hasConfig: boolean;
  setConfig: (credentials: ConfigCredentialsInterface) => void;
  clearConfig: () => void;
}

const configDataDefaults = {
  accessKeyId: undefined,
  secretAccessKey: undefined,
  region: undefined,
  bucket: undefined,
};

const ConfigContext = createContext<ConfigContextDataInterface>({
  configData: configDataDefaults,
  hasConfig: false,
  setConfig: () => {},
  clearConfig: () => {},
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [hasConfig, setHasConfig] = useState<boolean>(false);
  const [configData, setConfigData] =
    useState<ConfigCredentialsInterface>(configDataDefaults);

  const setConfig = async (credentials: ConfigCredentialsInterface) => {
    try {
      await getS3Objects(credentials, '');
      setConfigData(credentials);
      setHasConfig(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const clearConfig = () => {
    setConfigData(configDataDefaults);
    setHasConfig(false);
  };

  return (
    <ConfigContext.Provider
      value={{ hasConfig, setConfig, clearConfig, configData }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
