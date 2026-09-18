"use client";

import { Button, Modal } from "react-bootstrap";
import { useConfirm } from "../context/ConfirmContext";

export default function ConfirmDialog({ title, message }) {
  const { show, close, accept } = useConfirm();

  return (
    <Modal
      show={show}
      onHide={close}
      centered
      aria-labelledby="confirm-dialog-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="confirm-dialog-title">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={close}>
          Cancel
        </Button>

        <Button variant="danger" onClick={accept}>
          Confirm delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
