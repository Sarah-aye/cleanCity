import { Card } from "react-bootstrap";

export default function PledgeList({ pledges }) {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <p className="eyebrow mb-1">Community wall</p>
        <h2 className="h4 mb-4">Recent pledges</h2>
        {pledges.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div className="empty-icon">♡</div>
            <p className="text-muted mb-0">No pledges yet. Be the first.</p>
          </div>
        ) : (
          <div className="pledge-list">
            {pledges.map((pledge) => (
              <article key={pledge.id} className="pledge-item">
                <div className="pledge-mark">“</div>
                <div>
                  <p className="mb-1">{pledge.text}</p>
                  <small className="text-muted">
                    {new Date(pledge.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </article>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
