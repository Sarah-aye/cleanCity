"use client";

import { useState } from "react";

const MAX_LENGTH = 280;

export function usePledgeForm(onSubmit) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();

    const value = text.trim();

    if (!value) {
      setError("Please write a pledge before submitting.");
      return;
    }

    if (value.length > MAX_LENGTH) {
      setError(`Pledge must be ${MAX_LENGTH} characters or fewer.`);
      return;
    }

    onSubmit(value);

    setText("");
    setError("");
  };

  return {
    text,
    error,
    submit,
    setText,
    maxLength: MAX_LENGTH,
  };
}
