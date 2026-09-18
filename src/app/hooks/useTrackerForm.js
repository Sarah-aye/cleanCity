"use client";

import { useState, useEffect } from "react";

export function useTrackerForm({ onSubmit, initialValue }) {
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});

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

    if (quantity === "") {
      next.quantity = "Quantity is required.";
    } else if (Number.isNaN(Number(quantity))) {
      next.quantity = "Quantity must be a number.";
    } else if (Number(quantity) === 0) {
      next.quantity = "Quantity cannot be 0.";
    } else if (Number(quantity) < 0) {
      next.quantity = "Quantity cannot be negative.";
    } else if (!Number.isInteger(Number(quantity))) {
      next.quantity = "Quantity must be a positive whole number.";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    onSubmit({
      category,
      quantity: Number(quantity),
    });

    if (!initialValue) {
      setCategory("");
      setQuantity("");
    }
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
