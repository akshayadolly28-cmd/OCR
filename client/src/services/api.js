import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({ baseURL: API_BASE });

export function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
}

// Auth
export const registerUser = (data) => apiClient.post('/auth/register', data);
export const loginUser = (data) => apiClient.post('/auth/login', data);
export const getProfile = () => apiClient.get('/auth/profile');

// Complaints
export const createComplaint = (data) => apiClient.post('/complaints', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getComplaints = (params) => apiClient.get('/complaints', { params });
export const getComplaint = (id) => apiClient.get(`/complaints/${id}`);
export const updateComplaintStatus = (id, data) => apiClient.put(`/complaints/${id}/status`, data);
export const assignAgent = (id, data) => apiClient.put(`/complaints/${id}/assign`, data);
export const updateComplaint = (id, data) => apiClient.put(`/complaints/${id}`, data);
export const deleteComplaint = (id) => apiClient.delete(`/complaints/${id}`);

// Feedback
export const addFeedback = (data) => apiClient.post('/feedback', data);
export const getFeedbacks = (complaintId) => apiClient.get(`/feedback/${complaintId}`);

// Chat
export const addMessage = (data) => apiClient.post('/chat', data);
export const getMessages = (complaintId) => apiClient.get(`/chat/${complaintId}`);

// Admin
export const createAgent = (data) => apiClient.post('/admin/agents', data);
export const updateAgent = (id, data) => apiClient.put(`/admin/agents/${id}`, data);
export const deleteAgent = (id) => apiClient.delete(`/admin/agents/${id}`);
export const getAnalytics = () => apiClient.get('/admin/analytics');

export default apiClient;
