"use client";

import { usePledges } from "../hooks/usePledges";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Layout from "../components/Layout";
import PledgeList from "../components/PledgeList";
import PledgeForm from "../components/PledgeForm";

export default function Pledge() {
  const { pledges, addPledges, pledgeCount, message, clearMessage } =
    usePledges();

  return (
    <Layout>
      <Container className="py-5 page-shell">
        <Row className="g-4 align-items-start">
          <Col lg={5}>
            <div className="section-heading">
              <p className="eyebrow">Make it personal</p>
              <h1>Take the CleanCity+ Pledge</h1>
              <p>
                Choose one practical action you can repeat this week and make it
                public to the community.
              </p>
            </div>

            <Card className="impact-counter border-0 shadow-sm mb-3">
              <Card.Body>
                <div className="display-5 fw-bold">{pledgeCount}</div>
                <div className="text-muted">pledges made on this device</div>
              </Card.Body>
            </Card>

            {message && (
              <Alert variant="success" dismissible onClose={clearMessage}>
                {message}
              </Alert>
            )}

            <PledgeForm onSubmit={addPledge} />
          </Col>

          <Col lg={7}>
            <PledgeList pledges={pledges} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
