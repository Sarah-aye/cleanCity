import { Card } from "react-bootstrap";

export default function CategorySummeryCard({ icon, category, total }) {
  return (
    <Card className="category-card border-0 shadow-sm h-100">
      <Card.Body className="p-3 p-md-4">
        <div className="category-summary-icon">{icon}</div>
        <div className="text-muted small">{category}</div>
        <div className="display-6 fw-bold mt-1">{total}</div>
        <div className="small text-muted">items recycled</div>
      </Card.Body>
    </Card>
  );
}
