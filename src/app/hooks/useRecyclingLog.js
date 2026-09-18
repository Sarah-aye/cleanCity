"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

import { makeId } from "../utils/makeId";

export function useRecyclingLog(initialEntries = []) {
  const [logs, setLogs] = useLocalStorage(
    "cleancity-recycling-logs",
    initialEntries,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const addEntry = ({ category, quantity }) => {
    setLogs((current) => [
      ...current,
      {
        id: makeId(),
        category,
        quantity,
        createdAt: new Date().toISOString(),
      },
    ]);

    // console.log("logs is: ", logs);
  };

  const editEntry = (idOrLog, updates) => {
    setLogs((currentLogs) => {
      // Make sure we have an array to work with
      const list = Array.isArray(currentLogs) ? currentLogs : [];

      // If passed an object: editEntry(updatedLogObject)
      if (typeof idOrLog === "object" && idOrLog !== null && idOrLog.id) {
        return list.map((item) =>
          item.id === idOrLog.id ? { ...item, ...idOrLog } : item,
        );
      }

      // If passed ID and updates object: editEntry(id, updates)
      return list.map((item) =>
        item.id === idOrLog ? { ...item, ...updates } : item,
      );
    });
  };

  const deleteEntry = (id) =>
    setLogs((current) => current.filter((log) => log.id !== id));

  const filteredAndSortedLogs = useMemo(() => {
    const safeLogs = Array.isArray(logs) ? logs : [];
    const term = searchTerm.trim().toLowerCase();

    const filtered = term
      ? safeLogs.filter((log) => log.category?.toLowerCase().includes(term))
      : [...safeLogs];

    return filtered.sort((a, b) => {
      const catA = a.category ?? "";
      const catB = b.category ?? "";

      switch (sortBy) {
        case "category-asc":
          return catA.localeCompare(catB);
        case "category-desc":
          return catB.localeCompare(catA);
        case "quantity-asc":
          return (a.quantity || 0) - (b.quantity || 0);
        case "quantity-desc":
          return (b.quantity || 0) - (a.quantity || 0);
        case "date-desc":
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });
  }, [logs, searchTerm, sortBy]);

  return {
    logs,
    addEntry,
    editEntry,
    deleteEntry,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filteredAndSortedLogs,
  };
}
