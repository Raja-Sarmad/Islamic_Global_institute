import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/auth/refresh-token`,
            { refreshToken },
            { withCredentials: true }
          );
          
          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth APIs
export const authService = {
  login: (email, password) => 
    apiClient.post('/auth/login', { email, password }),
  
  register: (userData) => 
    apiClient.post('/auth/register', userData),
  
  verifyOtp: (email, otp) => 
    apiClient.post('/auth/verify-otp', { email, otp }),
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
};

// User APIs
export const userService = {
  getDashboard: () => 
    apiClient.get('/user/dashboard'),
};

// Admin APIs
export const adminService = {
  getAnalytics: () => 
    apiClient.get('/admin/analytics'),
  
  getUsers: () => 
    apiClient.get('/admin/users'),
  
  updatePayment: (userId, isPaid) => 
    apiClient.patch(`/admin/payment/${userId}`, { isPaid }),
  
  updateBlockStatus: (userId) => 
    apiClient.patch(`/admin/block/${userId}`),
  
  createReport: (reportData) => 
    apiClient.post('/admin/report', reportData),
};

export default apiClient;
