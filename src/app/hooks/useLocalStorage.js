import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const stored = window.localStorage.getItem(key);
      stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const store = window.localStorage.setItem(key, JSON.parse(value));
    } catch {
      // storage can be unavailable in private/restricted browsers
    }
  }, [key, value]);
  return [value, setValue];
}
