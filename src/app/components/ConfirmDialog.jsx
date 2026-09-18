"use client";

import { Button, Modal } from "react-bootstrap";
import { useConfirm } from "../context/ConfirmContext";

export default function ConfirmDialog() {
  const {
    show,
    close,
    accept,
    title,
    message,
    confirmText,
    cancelText,
    variant,
  } = useConfirm();

  return (
    <Modal
      show={show}
      onHide={close}
      centered
      aria-labelledby="confirm-dialog-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="confirm-dialog-title">
          {title || "Confirm Action"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{message || "Are you sure you want to proceed?"}</Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={close}>
          {cancelText}
        </Button>

        <Button variant={variant} onClick={accept}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
