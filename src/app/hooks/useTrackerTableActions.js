// hooks/useTrackerTableActions.js
"use client";

import { useState } from "react";
import { useConfirm } from "../context/ConfirmContext";
import { useRecyclingLog } from "./useRecyclingLog";

export function useTrackerTableActions() {
  const { editEntry, deleteEntry } = useRecyclingLog();
  const { confirm } = useConfirm();

  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  const handleStartEdit = (log) => {
    setEditingId(log.id);
    setEditCategory(log.category);
    setEditQuantity(log.quantity);
  };

  const handleSaveEdit = (id) => {
    editEntry(id, {
      category: editCategory,
      quantity: Number(editQuantity),
    });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (log) => {
    confirm({
      title: "Delete recycling log?",
      message: `Remove the ${log.quantity} ${log.category} item(s) from your tracker?`,
      onConfirm: () => deleteEntry(log.id),
    });
  };

  return {
    editingId,
    editCategory,
    setEditCategory,
    editQuantity,
    setEditQuantity,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleDelete,
  };
}
