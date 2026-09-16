import { Card, Button } from "react-bootstrap";

import { facts } from "../data/facts";
import useFactGenerator from "../hooks/useFactGenerator";

export default function FactGenerator() {
  const { fact, generateFact } = useFactGenerator();

  return (
    <Card className="fact-card border-0 shadow-lg">
      <Card.Body className="p-4 p-md-5">
        <div className="fact-kicker">DID YOU KNOW?</div>
        <p className="h4 mt-3 mb-4">{fact}</p>
        <Button variant="success" onClick={generateFact}>
          Another fact ↗
        </Button>
      </Card.Body>
    </Card>
  );
}
