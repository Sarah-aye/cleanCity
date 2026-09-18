"use client";

import { Button, Form, Table } from "react-bootstrap";

import { useRecyclingLog } from "../hooks/useRecyclingLog";
import { categories } from "../data/wasteCategories";

export default function TrackerTable() {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,

    filteredAndSortedLogs,
  } = useRecyclingLog();

  const {
    editingId,
    editCategory,
    setEditCategory,
    editQuantity,
    setEditQuantity,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleDelete,
  } = useTrackerTableActions();

  return (
    <>
      <div className="d-flex flex-column flex-md-row gap-2 justify-content-between mb-3">
        <Form.Group controlId="tracker-search" className="flex-grow-1">
          <Form.Label className="visually-hidden">
            Search by category
          </Form.Label>
          <Form.Control
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by category…"
            aria-label="Search by category"
          />
        </Form.Group>
        <Form.Select
          aria-label="Sort tracker"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ maxWidth: 230 }}
        >
          <option value="date-desc">Newest first</option>
          <option value="category-asc">Category A–Z</option>
          <option value="category-desc">Category Z–A</option>
          <option value="quantity-asc">Quantity low–high</option>
          <option value="quantity-desc">Quantity high–low</option>
        </Form.Select>
      </div>

      {filteredAndSortedLogs.length === 0 ? (
        <div className="empty-state text-center py-5">
          <div className="empty-icon">♻</div>
          <h3 className="h5">No recycling logs yet</h3>
          <p className="text-muted mb-0">
            Add your first item above, or change your search.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead>
              <tr>
                <th>Category</th>
                <th>Quantity</th>
                <th>Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedLogs.map((log) => (
                <tr key={log.id}>
                  {editingId === log.id ? (
                    <>
                      <td>
                        <Form.Select
                          size="sm"
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          aria-label="Select category"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Control
                          size="sm"
                          type="number"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                        />
                      </td>
                      <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleSaveEdit(log.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="fw-semibold">{log.category}</td>
                      <td>{log.quantity}</td>
                      <td>{new Date(log.createdAt).toLocaleDateString()}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => handleStartEdit(log)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(log)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}
