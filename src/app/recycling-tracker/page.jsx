"use client";

import { Container, Row, Col, Card } from "react-bootstrap";
import Layout from "../components/Layout";
import TrackerForm from "../components/TrackerForm";
import TrackerTable from "../components/TableTracker";
import Chart from "../components/chart";
import CategorySummeryCard from "../components/categorySummeryCard";
import withBadge from "../hocs/withBadge";
import { useRecyclingTracker } from "../hooks/useRecyclingTracker";

const BadgeCategoryCard = withBadge(CategorySummeryCard);

export default function RecyclingTracker() {
  const {
    logs,
    filteredAndSortedLogs,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    totals,
    editing,
    handleSubmit,
    handleCancel,
    handleEdit,
    deleteEntry,
  } = useRecyclingTracker();

  return (
    <Layout>
      <Container className="py-5 page-shell">
        <div className="section-heading">
          <p className="eyebrow">Your impact</p>
          <h1>Recycling Tracker</h1>
          <p>
            Log what you recycle, watch your totals grow, and earn category
            badges at 10 items.
          </p>
        </div>

        <Row className="g-4 mb-4 ">
          {totals.map((item) => (
            <Col xs={12} sm={6} lg key={item.category}>
              <BadgeCategoryCard {...item} icon={item.category.slice(0, 1)} />
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          <Col lg={5}>
            <TrackerForm
              onSubmit={handleSubmit}
              initialValue={editing}
              onCancel={handleCancel}
            />
          </Col>

          <Col lg={7}>
            <Chart logs={logs} />
          </Col>
        </Row>

        <Card className="border-0 shadow-sm mt-4">
          <Card.Body className="p-3 p-md-4">
            <TrackerTable
              logs={filteredAndSortedLogs}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onEdit={handleEdit}
              onDelete={deleteEntry}
            />
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
