import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getComplaint, getMessages, addMessage, addFeedback } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../utils/helpers';

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [submittingMsg, setSubmittingMsg] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });
  const [submittingFb, setSubmittingFb] = useState(false);

  useEffect(() => {
    fetchComplaint();
    fetchMessages();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const { data } = await getComplaint(id);
      setComplaint(data.complaint);
    } catch (err) {
      toast.error('Failed to fetch complaint');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await getMessages(id);
      setMessages(data.messages);
    } catch (err) {
      // silently fail
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmittingMsg(true);
    try {
      await addMessage({ complaintId: id, message });
      setMessage('');
      toast.success('Message sent');
      await fetchMessages();
    } catch (err) {
      toast.error('Failed to send message');
    } finally {
      setSubmittingMsg(false);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFb(true);
    try {
      await addFeedback({ complaintId: id, ...feedback });
      toast.success('Feedback submitted!');
      setFeedback({ rating: 5, comment: '' });
      await fetchComplaint();
    } catch (err) {
      toast.error('Failed to submit feedback');
    } finally {
      setSubmittingFb(false);
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
  if (!complaint) return <Alert variant="danger" className="m-4">Complaint not found</Alert>;

  const canProvideFeedback = user._id === complaint.userId._id && complaint.status === 'Resolved';

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Row className="g-3">
        <Col lg={8}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h3>{complaint.title}</h3>
                  <p className="text-muted mb-2">ID: {complaint._id}</p>
                </div>
                <div>{getStatusBadge(complaint.status)}</div>
              </div>
              <p className="lead">{complaint.description}</p>
              <Row className="text-muted mb-3">
                <Col md={3}>
                  <strong>Category:</strong> {complaint.category}
                </Col>
                <Col md={3}>
                  <strong>Priority:</strong> <Badge bg={complaint.priority === 'High' ? 'danger' : complaint.priority === 'Medium' ? 'warning' : 'info'}>{complaint.priority}</Badge>
                </Col>
                <Col md={6}>
                  <strong>Created:</strong> {new Date(complaint.createdAt).toLocaleString()}
                </Col>
              </Row>
              {complaint.attachment && (
                <div>
                  <strong>Attachment:</strong>{' '}
                  <a href={`http://localhost:5000${complaint.attachment}`} target="_blank" rel="noreferrer">
                    📎 Download
                  </a>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-3">
            <Card.Body>
              <h5>💬 Chat</h5>
              <div
                className="border rounded p-3 mb-3"
                style={{
                  height: '300px',
                  overflowY: 'auto',
                  backgroundColor: '#f8f9fa',
                }}
              >
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <div key={idx} className="mb-2">
                      <small className="fw-bold">{msg.senderId.name}:</small>
                      <p className="mb-1">{msg.message}</p>
                      <small className="text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center py-5">No messages yet</p>
                )}
              </div>
              <Form onSubmit={handleSendMessage}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={submittingMsg || !message.trim()}
                >
                  {submittingMsg ? 'Sending...' : 'Send'}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {canProvideFeedback && (
            <Card className="shadow-sm">
              <Card.Body>
                <h5>⭐ Leave Feedback</h5>
                <Form onSubmit={handleSubmitFeedback}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={feedback.rating}
                      onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}
                    >
                      <option value={1}>1 - Poor</option>
                      <option value={2}>2 - Fair</option>
                      <option value={3}>3 - Good</option>
                      <option value={4}>4 - Very Good</option>
                      <option value={5}>5 - Excellent</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Share your feedback..."
                      value={feedback.comment}
                      onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" disabled={submittingFb}>
                    {submittingFb ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">ℹ️ Details</h5>
              <div className="mb-3">
                <p className="text-muted mb-1">Submitted by</p>
                <p className="fw-bold">{complaint.userId.name}</p>
              </div>
              {complaint.agentId && (
                <div className="mb-3">
                  <p className="text-muted mb-1">Assigned to</p>
                  <p className="fw-bold">{complaint.agentId.name}</p>
                </div>
              )}
              <div>
                <p className="text-muted mb-1">Last Updated</p>
                <p className="fw-bold">{new Date(complaint.updatedAt).toLocaleString()}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
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
