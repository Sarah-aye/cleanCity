import { usePledgeForm } from "../hooks/usePledgeForm";
import { Button, Card, Form } from "react-bootstrap";

export default function PledgeForm({ onSubmit }) {
  const { text, error, submit, setText, maxLength } = usePledgeForm(onSubmit);

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <Form onSubmit={submit} noValidate>
          <Form.Group controlId="pledge-text">
            <Form.Label>Your pledge</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={text}
              maxLength={MAX_LENGTH}
              onChange={(e) => setText(e.target.value)}
              placeholder="This week I will…"
              aria-describedby="pledge-count pledge-error"
            />
            <div id="pledge-count" className="text-end small text-muted mt-1">
              {text.length}/{MAX_LENGTH}
            </div>
            {error && (
              <div id="pledge-error" className="invalid-feedback d-block">
                {error}
              </div>
            )}
          </Form.Group>
          <Button type="submit" variant="success" className="mt-3">
            Make my pledge
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
