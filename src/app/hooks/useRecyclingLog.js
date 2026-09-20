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
    const numQty = Number(quantity) || 0;
    const targetCategory = category ? category.trim().toLowerCase() : "";

    setLogs((current) => {
      const safeLogs = Array.isArray(current) ? current : [];

      // const existingIndex = safeLogs.findIndex(
      //   (log) => log.category?.trim().toLowerCase() === targetCategory,
      // );

      // if (existingIndex !== -1) {
      //   // Update existing category entry
      //   return safeLogs.map((item, index) => {
      //     if (index === existingIndex) {
      //       return {
      //         ...item,
      //         quantity: (Number(item.quantity) || 0) + numQty,
      //         createdAt: new Date().toISOString(), //  reflect latest log
      //       };
      //     }
      //     return item;
      //   });
      // }

      // Append new category entry if it doesn't exist yet
      return [
        ...safeLogs,
        {
          id: makeId(),
          category,
          quantity: numQty,
          createdAt: new Date().toISOString(),
        },
      ];
    });
  };

  const editEntry = (idOrLog, updates) => {
    setLogs((currentLogs) => {
      // Make sure we have an array to work with
      const list = Array.isArray(currentLogs) ? currentLogs : [];

      // If passed an object
      if (typeof idOrLog === "object" && idOrLog !== null && idOrLog.id) {
        return list.map((item) =>
          item.id === idOrLog.id ? { ...item, ...idOrLog } : item,
        );
      }

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

  const totalQuantity = useMemo(() => {
    return filteredAndSortedLogs.reduce(
      (sum, log) => sum + (Number(log.quantity) || 0),
      0,
    );
  }, [filteredAndSortedLogs]);

  const categoryTotals = useMemo(() => {
    const safeLogs = Array.isArray(logs) ? logs : [];
    return safeLogs.reduce((acc, log) => {
      // Normalizing category name to avoid case mismatch (e.g., "Plastic" vs "plastic")
      const key = log.category ? log.category.trim().toLowerCase() : "";
      const qty = Number(log.quantity) || 0;

      if (key) {
        acc[key] = (acc[key] || 0) + qty;
      }
      return acc;
    }, {});
  }, [logs]);

  // export to csv feature

  const exportToCSV = () => {
    const safeLogs = Array.isArray(logs) ? logs : [];
    if (safeLogs.length === 0) return;

    // Define CSV headers
    const headers = ["Category", "Quantity", "Date Created"];

    // Format log rows (escape quotes and format dates)
    const rows = safeLogs.map((log) => [
      `"${(log.category || "").replace(/"/g, '""')}"`, // Handle potential commas/quotes
      log.quantity || 0,
      `"${new Date(log.createdAt).toLocaleDateString()}"`,
    ]);

    // Combine headers and rows into CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create a Blob and trigger a download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `cleancity_recycling_log_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
    totalQuantity,
    categoryTotals,
    exportToCSV,
  };
}
