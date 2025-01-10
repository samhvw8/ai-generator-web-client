import { useRef, useEffect } from 'react';

export function useAbortController() {
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  const getSignal = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    return abortController.current.signal;
  };

  const abort = () => {
    if (abortController.current) {
      abortController.current.abort();
      abortController.current = null;
    }
  };

  return {
    getSignal,
    abort,
  };
}