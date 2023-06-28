import { useState, ChangeEvent, useEffect, useRef, useCallback } from 'react';

import { Validator } from '../utils/validators';

const useInput = ({ validation, validationError }: Validator) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const initialLoad = useRef(true);

  const validateInput = useCallback(() => {
    if (!validation(value)) {
      setError(validationError);
    }
    return validation(value);
  }, [validation, validationError, value]);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    setError('');

    validateInput();
  }, [value, validateInput]);

  // Prevents update of other inputs in the same parent
  const handleValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = e.target.value;

      setValue(inputValue);
    },
    []
  );

  return { value, error, handleValueChange, validateInput };
};

export default useInput;
