import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadMatch = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload-match', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getMatchAnalysis = () => api.get('/analyze-match');

export const chatWithAI = (question) => api.post('/chat', { question });

export const getOverCommentary = (inningsIdx, overIdx) => 
  api.get(`/commentary/${inningsIdx}/${overIdx}`);

export default api;
