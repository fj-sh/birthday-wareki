import { useEffect, useRef } from 'react';

const useTimeout = () => {
  const ref = useRef<NodeJS.Timeout>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const run = (handler: (...args: any[]) => void, timeout: number) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(handler, timeout);
  };

  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, []);
  return run;
};

export { useTimeout };
