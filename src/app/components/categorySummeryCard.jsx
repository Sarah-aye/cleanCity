import { Card, CardBody } from "react-bootstrap";

console.log("Card:", Card);
console.log("Card keys:", Object.keys(Card));
console.log("Card.Body:", Card.Body);

export default function CategorySummeryCard({ icon, category, total }) {
  console.log("Card:", Card);
  console.log("Card.Body:", Card?.Body);
  return (
    <Card className="category-card border-0 shadow-sm h-100">
      <CardBody className="p-3 p-md-4">
        <div className="category-summary-icon">{icon}</div>
        <div className="text-muted small">{category}</div>
        <div className="display-6 fw-bold mt-1">{total}</div>
        <div className="small text-muted">{`${category} recycled`}</div>
      </CardBody>
    </Card>
  );
}
