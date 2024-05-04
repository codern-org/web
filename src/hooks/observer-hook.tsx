import { useLayoutEffect, useRef } from 'react';

export const useResizeObserver = <T extends HTMLElement>(
  callback: (target: T, entry: ResizeObserverEntry) => void,
) => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      callback(element, entries[0]);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, ref]);

  return ref;
};
