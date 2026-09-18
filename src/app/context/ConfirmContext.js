"use client";

import { useContext, createContext, useState } from "react";

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const [show, setShow] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "primary",
  });
  const [onConfirm, setOnConfirm] = useState(null);

  const confirm = ({
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "primary",
    onConfirm: callBack,
  }) => {
    setDialogConfig({ title, message, confirmText, cancelText, variant });
    setOnConfirm(() => callBack);
    setShow(true);
  };

  const close = () => {
    setShow(false);
    setOnConfirm(null);
  };

  const accept = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
    close();
  };

  return (
    <ConfirmContext.Provider
      value={{
        show,
        confirm,
        close,
        accept,
        ...dialogConfig,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
