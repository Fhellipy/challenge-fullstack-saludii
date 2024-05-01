import { useEffect, useRef } from "react";

type Callback<T> = (...args: T[]) => void;

export function useDebounce<T>(fn: Callback<T>, delay: number) {
  const timeoutRef = useRef<number | null>(null);

  function cleanup() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => cleanup, []);

  return function debouncedFn(...args: T[]) {
    cleanup();

    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
