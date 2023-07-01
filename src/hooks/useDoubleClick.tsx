import { useEffect, MutableRefObject } from 'react';

type RefType<T> = MutableRefObject<T | null>;

interface UseDoubleClickOptions {
  ref: RefType<HTMLElement>;
  latency?: number;
  onSingleClick?: (event: MouseEvent) => void;
  onDoubleClick?: (event: MouseEvent) => void;
  isDefaultPrevented?: boolean;
}

const useDoubleClick = ({
  ref,
  latency = 300,
  onSingleClick = () => null,
  onDoubleClick = () => null,
  isDefaultPrevented = false,
}: UseDoubleClickOptions): void => {
  useEffect(() => {
    const clickRef = ref.current;
    let clickCount = 0;
    const handleClick = (e: MouseEvent) => {
      if (isDefaultPrevented) {
        e.preventDefault();
      }

      clickCount += 1;

      setTimeout(() => {
        if (clickCount === 1) onSingleClick(e);
        else if (clickCount === 2) onDoubleClick(e);

        clickCount = 0;
      }, latency);
    };

    // Add event listener for click events
    clickRef?.addEventListener('click', handleClick);

    // Remove event listener
    return () => {
      clickRef?.removeEventListener('click', handleClick);
    };
  }, [ref, latency, onSingleClick, onDoubleClick, isDefaultPrevented]);
};

export default useDoubleClick;
