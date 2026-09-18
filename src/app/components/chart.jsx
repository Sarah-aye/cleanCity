"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card } from "react-bootstrap";
import { categories } from "../data/wasteCategories";

export default function Chart({ logs = [] }) {
  const data = categories.map((category) => ({
    category,
    total: logs
      .filter((log) => log.category === category)
      .reduce((sum, log) => sum + log.quantity, 0),
  }));
  const hasData = data.some((item) => item.total > 0);

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body className="p-4">
        <p className="eyebrow mb-1">Visual impact</p>
        <h2 className="h4">Items recycled by category</h2>
        {!hasData ? (
          <div className="chart-empty">
            <div className="empty-icon">▥</div>
            <p className="mb-0">
              Your chart will come alive after your first recycling log.
            </p>
          </div>
        ) : (
          <div
            style={{ width: "100%", height: 310 }}
            aria-label="Bar chart of recycled items by category"
          >
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="total"
                  name="Items"
                  radius={[6, 6, 0, 0]}
                  fill="var(--accent)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
