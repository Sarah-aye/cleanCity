"use client";

import { categories } from "../data/wasteCategories";
import { useRecyclingLog } from "./useRecyclingLog";
import { useState, useMemo } from "react";

export function useRecyclingTracker() {
  const {
    logs,
    filteredAndSortedLogs,
    addEntry,
    editEntry,
    deleteEntry,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
  } = useRecyclingLog();

  const [editing, setEditing] = useState(null);

  const totals = useMemo(
    () =>
      categories.map((category) => ({
        category,
        total: logs
          .filter((log) => log.category === category)
          .reduce((sum, log) => sum + log.quantity, 0),
      })),
    [logs],
  );

  const handleSubmit = (payload) => {
    if (editing) {
      editEntry(editing.id, payload);
      setEditing(null);
    } else {
      addEntry(payload);
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  const handleEdit = (entry) => {
    setEditing(entry);
  };

  return {
    logs,
    filteredAndSortedLogs,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,

    totals,

    editing,
    handleSubmit,
    handleCancel,
    handleEdit,
    deleteEntry,
  };
}
