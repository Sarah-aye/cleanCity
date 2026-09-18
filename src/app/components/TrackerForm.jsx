"use client";

import { Button, Card, Form } from "react-bootstrap";
import { categories } from "../data/wasteCategories";
import { useTrackerForm } from "../hooks/useTrackerForm";

export default function TrackerForm({ onSubmit, initialValue, onCancel }) {
  const { category, setCategory, quantity, setQuantity, errors, submit } =
    useTrackerForm({
      onSubmit,
      initialValue,
    });

  const isEditing = Boolean(initialValue);

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <p className="eyebrow mb-1">
              {isEditing ? "Edit entry" : "New entry"}
            </p>

            <h2 className="h4 mb-0">
              {isEditing ? "Update your log" : "Log recycling"}
            </h2>
          </div>
        </div>

        <Form onSubmit={submit} noValidate>
          <Form.Group className="mb-3" controlId="tracker-category">
            <Form.Label>Waste category</Form.Label>

            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-describedby={errors.category ? "category-error" : undefined}
              suppressHydrationWarning
            >
              <option value="">Choose a category</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>

            {errors.category && (
              <div id="category-error" className="invalid-feedback d-block">
                {errors.category}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-4" controlId="tracker-quantity">
            <Form.Label>Quantity</Form.Label>

            <Form.Control
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              aria-describedby={errors.quantity ? "quantity-error" : undefined}
            />

            {errors.quantity && (
              <div id="quantity-error" className="invalid-feedback d-block">
                {errors.quantity}
              </div>
            )}
          </Form.Group>

          <div className="d-flex flex-wrap gap-2">
            <Button type="submit" variant="success">
              {isEditing ? "Save changes" : "Add to tracker"}
            </Button>

            {isEditing && (
              <Button
                type="button"
                variant="outline-secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
