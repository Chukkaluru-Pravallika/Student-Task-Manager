// frontend/src/services/api.js - CORRECTED VERSION
import axios from 'axios';

const API_URL = 'http://localhost:5600/api';  // ← CORRECT: Ends at /api

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const taskAPI = {
  getAll: () => api.get('/tasks'),           // ← CORRECT: No double /tasks
  getById: (id) => api.get(`/tasks/${id}`),
  create: (task) => api.post('/tasks', task),
  update: (id, task) => api.put(`/tasks/${id}`, task),
  delete: (id) => api.delete(`/tasks/${id}`)
};