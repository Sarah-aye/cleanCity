"use client";

import { useContext, createContext, useState, useRef, useEffect } from "react";

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

  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);

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

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      confirmButtonRef.current?.focus();
    }, 50);

    const handleWindowKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        if (document.activeElement === confirmButtonRef.current) {
          cancelButtonRef.current?.focus();
        } else {
          confirmButtonRef.current?.focus();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        accept();
      }
    };

    window.addEventListener("keydown", handleWindowKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [show, onConfirm]);

  return (
    <ConfirmContext.Provider
      value={{
        show,
        confirm,
        close,
        accept,
        ...dialogConfig,
        cancelButtonRef,
        confirmButtonRef,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
