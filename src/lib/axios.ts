import axios from 'axios';
import Cookies from 'js-cookie';


// Create axios instance with custom config
let api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    // withCredentials: true, // Important for cookies
});

// Request interceptor
api.interceptors.request.use(async (config) => {
    try {
        // Fetch CSRF token if needed
        // const res = await fetch('/api/csrf-token');
        // const data = await res.json();
        // const csrfToken = Cookies.get('laravel_session');

        // // Add CSRF token to headers
        // if (data.csrfToken) {
        //     config.headers['X-CSRF-Token'] = data.csrfToken;
        // }

        return config;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return Promise.reject(error);
    }
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle specific error cases
        if (error.response?.status === 403) {
            console.error('CSRF token validation failed');
        }
        return Promise.reject(error);
    }
);

// API methods
export const apiClient = {
    get: <T>(url: string, headers?: Record<string, string>) =>
        api.get<T>(url, { headers }).then((res) => res.data),

    post: <T>(url: string, data: any, headers?: Record<string, string>) =>
        api.post<T>(url, data, { headers }).then((res) => res.data),

    put: <T>(url: string, data: any, headers?: Record<string, string>) =>
        api.put<T>(url, data, { headers }).then((res) => res.data),

    delete: <T>(url: string, headers?: Record<string, string>) =>
        api.delete<T>(url, { headers }).then((res) => res.data),
};

export default api;