import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Pagination, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getComplaints } from '../services/api';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, [page, filter]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const { data } = await getComplaints({ page, limit, status: filter || undefined });
      setComplaints(data.complaints);
      setTotal(data.total);
    } catch (err) {
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      Pending: 'warning',
      Assigned: 'info',
      'In Progress': 'primary',
      Resolved: 'success',
      Closed: 'secondary',
    };
    return <Badge bg={variants[status] || 'light'}>{status}</Badge>;
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>📊 My Complaints Dashboard</h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => navigate('/complaint/new')}>
            ➕ New Complaint
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5>{complaints.length}</h5>
              <p className="text-muted mb-0">Total Complaints</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Filter by Status</Form.Label>
            <Form.Select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          ) : complaints.length > 0 ? (
            <>
              <Table responsive hover>
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((c) => (
                    <tr key={c._id}>
                      <td className="fw-bold">{c.title}</td>
                      <td>{c.category}</td>
                      <td>{getStatusBadge(c.status)}</td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => navigate(`/complaint/${c._id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {totalPages > 1 && (
                <Pagination className="mt-3">
                  {[...Array(totalPages).keys()].map((p) => (
                    <Pagination.Item
                      key={p + 1}
                      active={page === p + 1}
                      onClick={() => setPage(p + 1)}
                    >
                      {p + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              )}
            </>
          ) : (
            <p className="text-center text-muted py-4">No complaints found</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
