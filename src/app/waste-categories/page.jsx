"use client";

import { Accordion, Container, Card } from "react-bootstrap";

import { wasteCategories } from "../data/wasteCategories";

import Layout from "../components/Layout";

// console.log("type of wastecategories", wasteCategories);
export default function WasteCategories() {
  return (
    <Layout>
      <Container className="py-5 page-shell">
        <div className="section-heading">
          <p className="eyebrow">Waste guide</p>
          <h1>Waste Categories</h1>
          <p>
            Know what belongs where and reduce contamination in recycling
            streams.
          </p>
        </div>
        <Accordion alwaysOpen>
          {wasteCategories.map((item, index) => (
            <Accordion.Item eventKey={String(index)} key={item.id}>
              <Accordion.Header>
                <span className="category-icon me-3">{item.icon}</span>
                <span className="fw-semibold">{item.name}</span>
              </Accordion.Header>
              <Accordion.Body>
                <RowContent item={item} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Layout>
  );
}

function RowContent({ item }) {
  return (
    <div className="category-detail">
      <p>{item.description}</p>
      <h3 className="h6 fw-bold">Disposal tips</h3>
      <ul>
        {item.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
