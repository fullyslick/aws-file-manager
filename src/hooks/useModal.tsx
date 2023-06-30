import { useCallback, useState } from 'react';

const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const toggle = useCallback(() => setIsShown(!isShown), [isShown]);
  return {
    isShown,
    toggle,
  };
};

export default useModal;
