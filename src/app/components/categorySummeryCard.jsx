import { Card, CardBody } from "react-bootstrap";

export default function CategorySummeryCard({ icon, category, total }) {
  return (
    <Card className="category-card border-0 shadow-sm h-100 bg-body-tertiary">
      <CardBody className="p-3 p-md-4">
        <div className="category-summary-icon mb-2">{icon}</div>
        <div className="text-body-secondary small fw-medium">{category}</div>
        <div className="display-6 fw-bold mt-1 text-body">{total}</div>
        <div className="small text-body-secondary mt-1">{`${category} recycled`}</div>
      </CardBody>
    </Card>
  );
}
