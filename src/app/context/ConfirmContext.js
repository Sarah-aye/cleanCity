"use client";

import { useContext, createContext, useState } from "react";

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const [show, setShow] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({ title: "", message: "" });
  const [onConfirm, setOnConfirm] = useState(null);

  // Pass options object: confirm({ title, message, onConfirm })
  const confirm = ({ title, message, onConfirm: callBack }) => {
    setDialogConfig({ title, message });
    setOnConfirm(() => callBack);
    setShow(true);
  };

  const close = () => {
    setShow(false);
    setOnConfirm(null);
  };

  const accept = () => {
    if (onConfirm) {
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
        title: dialogConfig.title,
        message: dialogConfig.message,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
