import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getComplaints, updateComplaintStatus } from '../services/api';

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Assigned');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchComplaints();
  }, [filter, page]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const { data } = await getComplaints({ page, limit: 10, status: filter || undefined });
      setComplaints(data.complaints);
    } catch (err) {
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await updateComplaintStatus(complaintId, { status: newStatus });
      toast.success('Complaint status updated');
      await fetchComplaints();
    } catch (err) {
      toast.error('Failed to update status');
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

  return (
    <Container className="py-4">
      <h2 className="mb-4">👷 Agent Dashboard</h2>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h5 className="text-primary">{complaints.length}</h5>
              <p className="text-muted mb-0">Active Complaints</p>
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
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Form.Select>
          </Form.Group>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          ) : complaints.length > 0 ? (
            <Table responsive hover>
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c._id}>
                    <td className="fw-bold">{c.title}</td>
                    <td>{c.userId.name}</td>
                    <td>{getStatusBadge(c.status)}</td>
                    <td>
                      <Badge bg={c.priority === 'High' ? 'danger' : c.priority === 'Medium' ? 'warning' : 'info'}>
                        {c.priority}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/complaint/${c._id}`)}
                      >
                        View
                      </Button>
                      <Form.Select
                        size="sm"
                        style={{ display: 'inline-block', width: 'auto' }}
                        value={c.status}
                        onChange={(e) => handleStatusChange(c._id, e.target.value)}
                      >
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-muted py-4">No complaints found</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
