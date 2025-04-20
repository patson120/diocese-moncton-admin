import axios from 'axios';
import Cookies from 'js-cookie';


// Create axios instance with custom config
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Important for cookies
});

// Request interceptor
api.interceptors.request.use(async (config) => {
    try {
        // Fetch CSRF token if needed
        // const res = await fetch('/api/csrf-token');
        // const data = await res.json();

        const csrfToken = Cookies.get('laravel_session');

        axios.defaults.headers.common['X-XSRF-TOKEN'] = "eyJpdiI6InJVVFJ0Rk9Fbm8xQStlL3JTMnk0M0E9PSIsInZhbHVlIjoidkpkbWhyM0Y3MDhmaGhhMXhzYUlSVit3Q2JlMGNkK2w3d05VL21ibnh4RHppTlhGZ1Zqd0NJNUgrRGYvVmxaZmR3M2hvTlFjOTNwNE40c1JocnJNYnJCMUR3aG0xV1lrNlpCRnd4bGtHRFZyQ25SNTl6TUtHTVJscFdRWW1RSFkiLCJtYWMiOiJmNzM5ZDI0ZGEzMjMyOTIwNzk1ZDI5OWU5MjQ0MjA1MTNkOTQxY2I0NDQzZmVlYjZmYTlhMTFlYmExYTMwMzQxIiwidGFnIjoiIn0%3D; expires=Sat, 19 Apr 2025 23:28:45 GMT; Max-Age=7200; path=/; httponly; samesite=lax"
        ;

        console.log("Je suis ici");
        console.log(csrfToken);
        

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
    get: <T>(url: string) =>
        api.get<T>(url).then((res) => res.data),

    post: <T>(url: string, data: any) =>
        api.post<T>(url, data).then((res) => res.data),

    put: <T>(url: string, data: any) =>
        api.put<T>(url, data).then((res) => res.data),

    delete: <T>(url: string) =>
        api.delete<T>(url).then((res) => res.data),
};

export default api;