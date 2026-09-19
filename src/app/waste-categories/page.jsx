"use client";

import { Accordion, Container, Card } from "react-bootstrap";

import { wasteCategories } from "../data/wasteCategories";

import Layout from "../components/Layout";

// console.log("type of wastecategories", wasteCategories);
export default function WasteCategories() {
  return (
    <Layout>
      <Container className="py-5 page-shell bg-body text-body">
        <div className="section-heading">
          <p className="eyebrow">Waste guide</p>
          <h1>Waste Categories</h1>
          <p>
            Know what belongs where and reduce contamination in recycling
            streams.
          </p>
        </div>
        <Accordion alwaysOpen defaultActiveKey={["0"]}>
          {wasteCategories.map((item, index) => (
            <Accordion.Item eventKey={String(index)} key={item.id}>
              <Accordion.Header id={`heading-${item.id}`}>
                <span className="category-icon me-3" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="fw-semibold">{item.name}</span>
              </Accordion.Header>
              <Accordion.Body
                role="region"
                aria-labelledby={`heading-${item.id}`}
              >
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
