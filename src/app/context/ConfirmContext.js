"use client";

import { useContext, createContext, useState } from "react";

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const [show, setShow] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);

  const confirm = (callBack) => {
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
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
