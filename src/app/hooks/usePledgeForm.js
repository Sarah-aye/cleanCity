"use client";

import { useState } from "react";
import { useConfirm } from "../context/ConfirmContext";

const MAX_LENGTH = 280;

export function usePledgeForm(onSubmit) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { confirm } = useConfirm();

  // Internal function to process the actual pledge submission
  const executeSubmit = (value) => {
    onSubmit?.(value);
    setText("");
    setError("");
  };

  // Main submit handler attached to the Form onSubmit event
  const handleSubmit = (event) => {
    event?.preventDefault();

    const value = text.trim();

    // 1. Validate empty field
    if (!value) {
      setError("Please write a pledge before submitting.");
      return;
    }

    // 2. Validate max length
    if (value.length > MAX_LENGTH) {
      setError(`Pledge must be ${MAX_LENGTH} characters or fewer.`);
      return;
    }

    // 3. Clear any existing errors before confirming
    setError("");

    // 4. Trigger global confirmation modal
    confirm({
      title: "Confirm Your Pledge",
      message: `Are you sure you want to submit this pledge? "${value}"`,
      confirmText: "Submit Pledge",
      cancelText: "Edit Pledge",
      variant: "success",
      onConfirm: () => executeSubmit(value),
    });
  };

  return {
    text,
    error,
    handleSubmit,
    setText,
    MAX_LENGTH,
  };
}
