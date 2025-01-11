import { api } from './api';

export const storage = {
  // Helper function to handle errors
  async handleApiRequest(request) {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw new Error(error.response?.data?.message || "Something went wrong.");
    }
  },

  async getUsers() {
    return this.handleApiRequest(() => api.get('/users'));
  },

  async saveUser(userData) {
    return this.handleApiRequest(() => api.post('/users/register', userData));
  },

  async login(email, password) {
    const userData = { email, password };
    const response = await this.handleApiRequest(() => api.post('/users/login', userData));
    
    const { token, user } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  },

  async getExams() {
    return this.handleApiRequest(() => api.get('/exams'));
  },

  async saveExam(examData) {
    const response = await this.handleApiRequest(() => api.post('/exams', examData));
    return response.newExam;
  },

  async getExamById(id) {
    return this.handleApiRequest(() => api.get(`/exams/${id}`));
  },

  async saveExamResult(resultData) {
    const student = JSON.parse(localStorage.getItem('currentUser'));
    const result = {
      exam: resultData.exam_id,
      student: student._id,
      marksObtained: Math.round(resultData.score * resultData.totalQuestions / 100)
    };
    return this.handleApiRequest(() => api.post('/results', result));
  },

  async deleteExam(id) {
    return this.handleApiRequest(() => api.delete(`/exams/${id}`));
  },

  async updateExam(updatedExam) {
    const response = await this.handleApiRequest(() => api.put(`/exams/${updatedExam.id}`, updatedExam));
    return response.updatedExam;
  },

  async getStudentResults(studentId) {
    return this.handleApiRequest(() => api.get(`/results/${studentId}`));
  },

  async getAllResults() {
    return this.handleApiRequest(() => api.get('/results'));
  }
};
