import axios from 'axios';

// Create a single Axios instance for all API requests.
const apiClient = axios.create({
	baseURL: '/api',
	withCredentials: true, // Required for cross-site cookie usage
});

export default apiClient;
