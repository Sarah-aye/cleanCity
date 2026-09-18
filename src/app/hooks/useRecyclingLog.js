"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { categories } from "../data/wasteCategories";
import { makeId } from "../utils/makeId";

export function useRecyclingLog(initialEntries = []) {
  const [logs, setLogs] = useLocalStorage(
    "cleancity-recycling-logs",
    initialEntries,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("desc-date");

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

  const editEntry = (id, updates) => {
    setLogs((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, ...updates } : entry,
      ),
    );
  };

  const deleteEntry = (id) =>
    setLogs((current) => current.filtter((entry) => entry.id !== id));

  const filteredAndSortedLogs = useMemo(() => {
    // const logs = Array.isArray(log) ? log : [];
    const term = searchTerm.trim().toLocaleLowerCase();

    // if (Array.isArray(logs)) {
    //   console.log("true logs");
    // } else {
    //   throw new Error("logs is not an array", logs);
    // }

    const filtered = term
      ? logs.filter((entry) => entry.category.toLowerCase().includes(term))
      : Array.from(logs);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "category-asc":
          return a.category.localCompare(b.category);
        case "category-desc":
          return b.category.localCompare(a.category);
        case "quantity-asc":
          return a.quantity - b.quantity;
        case "quantity-desc":
          return b.quantity - a.quantity;
        case "date-desc":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
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
