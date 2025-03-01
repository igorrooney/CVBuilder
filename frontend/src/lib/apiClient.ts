import axios from 'axios';

// Create a single Axios instance for all API requests.
const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // Required for cross-site cookie usage
});

// Define a function to call the refresh endpoint
async function refreshTokens() {
  await apiClient.post('/auth/refresh');
  // If successful, the server sets new cookies for access & refresh tokens
}

// Response interceptor: If a request returns 401, try to refresh the token.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error :>> ', error);
    // If it's a 401 error from the server
    if (error.response?.status === 401) {
      try {
        // Attempt to refresh
        await refreshTokens();

        // Retry the original request with the new token (now in cookies)
        return apiClient.request(error.config);
      } catch (refreshError) {
        // If refresh fails, user must log in again
        // (Clear any client-side auth state if needed)
        return Promise.reject(refreshError);
      }
    }
    // For other errors, just reject
    return Promise.reject(error);
  }
);

export default apiClient;
