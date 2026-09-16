import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge as BsBadge,
} from "react-bootstrap";
import Layout from "@/components/Layout";
import FactGenerator from "@/components/FactGenerator";
import CategorySummaryCard from "@/components/CategorySummaryCard";
import withBadge from "@/hocs/withBadge";

import { categories } from "./data/wasteCategories";

const BadgeCategoryCard = withBadge(CategorySummaryCard);

export default function Home() {
  return (
    <Layout>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <BsBadge bg="light" text="success" className="mb-3 px-3 py-2">
                CLEAN CITY • BETTER TOMORROW
              </BsBadge>
              <h1 className="display-3 fw-bold">
                Small habits.{" "}
                <span className="text-accent">Cleaner cities.</span>
              </h1>
              <p className="lead text-white-50 mt-3">
                Learn how to sort waste, track your recycling, and make a pledge
                that turns intention into action.
              </p>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Button
                  as={Link}
                  href="/recycling-tracker"
                  variant="light"
                  size="lg"
                >
                  Start tracking
                </Button>
                <Button
                  as={Link}
                  href="/waste-categories"
                  variant="outline-light"
                  size="lg"
                >
                  Learn categories
                </Button>
              </div>
            </Col>
            <Col lg={5}>
              <FactGenerator />
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <div className="section-heading">
          <p className="eyebrow">Know your waste</p>
          <h2>Five categories, clearer choices.</h2>
          <p>
            Explore practical disposal guidance before you log your next
            recycled item.
          </p>
        </div>
        <Row className="g-3">
          {categories.map((category) => (
            <Col key={category.id} xs={12} sm={6} lg={4}>
              <BadgeCategoryCard
                category={category.name}
                total={0}
                icon={category.icon}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}
