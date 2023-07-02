import { useCallback, useState } from 'react';

const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const toggle = useCallback(() => setIsShown((prevState) => !prevState), []);
  return {
    isShown,
    toggle,
  };
};

export default useModal;
