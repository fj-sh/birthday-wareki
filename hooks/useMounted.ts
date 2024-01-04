import { useSharedValue } from 'react-native-reanimated';
import { useTimeout } from './useTimeout';
import { useEffect } from 'react';

const useMounted = () => {
  const mounted = useSharedValue(false);
  const runTimeout = useTimeout();

  useEffect(() => {
    runTimeout(() => {
      mounted.value = true;
    }, 100);

    return () => {
      mounted.value = false;
    };
  }, [mounted, runTimeout]);
  return mounted;
};

export { useMounted };
