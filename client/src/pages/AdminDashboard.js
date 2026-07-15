import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Spinner, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAnalytics, getComplaints } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    fetchComplaints();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      toast.error('Failed to fetch analytics');
    }
  };

  const fetchComplaints = async () => {
    try {
      const { data } = await getComplaints({ page: 1, limit: 10 });
      setComplaints(data.complaints);
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

  if (loading) return <Loader />;

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">⚙️ Admin Dashboard</h2>

      {analytics && (
        <>
          <Row className="mb-4 g-3">
            <Col md={3}>
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <h3 className="text-primary">{analytics.totalUsers}</h3>
                  <p className="text-muted mb-0">Total Users</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <h3 className="text-success">{analytics.totalAgents}</h3>
                  <p className="text-muted mb-0">Total Agents</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <h3 className="text-warning">{analytics.totalComplaints}</h3>
                  <p className="text-muted mb-0">Total Complaints</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <h3 className="text-info">{analytics.resolved}</h3>
                  <p className="text-muted mb-0">Resolved</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {analytics.monthly && analytics.monthly.length > 0 && (
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5>📊 Complaint Trends</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.monthly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#0d6efd" name="Complaints" />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          )}

          {analytics.agents && analytics.agents.length > 0 && (
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5>👷 Agent Performance</h5>
                <Table responsive>
                  <thead className="table-light">
                    <tr>
                      <th>Agent Name</th>
                      <th>Total Assigned</th>
                      <th>Resolved</th>
                      <th>Resolution Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.agents.map((agent, idx) => (
                      <tr key={idx}>
                        <td>{agent.agent.name}</td>
                        <td>{agent.total}</td>
                        <td>{agent.resolved}</td>
                        <td>
                          <Badge bg="info">
                            {((agent.resolved / agent.total) * 100).toFixed(0)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <h5>📋 Recent Complaints</h5>
          {complaints.length > 0 ? (
            <Table responsive hover>
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Action</th>
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
                        onClick={() => navigate(`/complaint/${c._id}`)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted text-center py-4">No complaints</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" />
    </div>
  );
}
