"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

function subscribe(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useLocalStorage(key, initialValue) {
  // Read value synchronously from localStorage on client, return initialValue on server
  const getSnapshot = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : JSON.stringify(initialValue);
    } catch {
      return JSON.stringify(initialValue);
    }
  };

  const getServerSnapshot = () => JSON.stringify(initialValue);

  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [value, setInternalValue] = useState(() => JSON.parse(store));

  // Sync internal state if localStorage changes across tabs/events
  useEffect(() => {
    setInternalValue(JSON.parse(store));
  }, [store]);

  // Handle Dark Mode DOM updates when managing key === "theme"
  useEffect(() => {
    if (typeof window === "undefined" || key !== "theme") return;

    const root = document.documentElement;
    const isDark = value === "dark";

    // Standard CSS class strategy (.dark)
    root.classList.toggle("dark", isDark);

    // Bootstrap 5 / React-Bootstrap attribute strategy
    root.setAttribute("data-bs-theme", isDark ? "dark" : "light");
  }, [key, value]);

  const setValue = useCallback(
    (newValue) => {
      try {
        const nextValue =
          newValue instanceof Function ? newValue(value) : newValue;

        setInternalValue(nextValue);
        window.localStorage.setItem(key, JSON.stringify(nextValue));

        // Dispatch event to notify useSyncExternalStore in the same tab
        window.dispatchEvent(new Event("storage"));
      } catch {
        // Storage unavailable
      }
    },
    [key, value],
  );

  return [value, setValue];
}
