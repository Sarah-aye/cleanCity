"use client";

import { useState, useEffect } from "react";
import { useConfirm } from "../context/ConfirmContext";

export function useTrackerForm({ onSubmit, initialValue }) {
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});

  const { confirm } = useConfirm();
  const isEditing = Boolean(initialValue);

  useEffect(() => {
    setCategory(initialValue?.category || "");
    setQuantity(initialValue?.quantity?.toString() || "");
    setErrors({});
  }, [initialValue]);

  const validate = () => {
    const next = {};

    if (!category) {
      next.category = "Please select a waste category.";
    }

    const numQuantity = Number(quantity);

    if (quantity === "") {
      next.quantity = "Quantity is required.";
    } else if (Number.isNaN(numQuantity)) {
      next.quantity = "Quantity must be a number.";
    } else if (numQuantity === 0) {
      next.quantity = "Quantity cannot be 0.";
    } else if (numQuantity < 0) {
      next.quantity = "Quantity cannot be negative.";
    } else if (!Number.isInteger(numQuantity)) {
      next.quantity = "Quantity must be a whole number.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const submit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (!validate()) return;

    confirm({
      title: isEditing ? "Confirm Update" : "Confirm Entry",
      message: isEditing
        ? "Are you sure you want to update this entry?"
        : "Are you sure you want to log this recycling entry?",
      confirmText: isEditing ? "Save Changes" : "Submit",
      cancelText: "Cancel",
      variant: "success",
      onConfirm: () => {
        // Run submission logic only when user accepts
        onSubmit({
          category,
          quantity: Number(quantity),
        });

        if (!initialValue) {
          setCategory("");
          setQuantity("");
        }
      },
    });
  };

  return {
    category,
    setCategory,
    quantity,
    setQuantity,
    errors,
    submit,
  };
}
