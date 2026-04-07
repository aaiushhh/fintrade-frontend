export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export const fetchClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers: any = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // If body is FormData, browser needs to set the Content-Type with boundary
  if (options.body && options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API Error: ${response.statusText}`;
    try {
      const errorData = await response.json();
      const detail = errorData.detail;
      if (typeof detail === 'string') {
        errorMessage = detail;
      } else if (Array.isArray(detail)) {
        // FastAPI validation errors come as [{loc, msg, type}, ...]
        errorMessage = detail.map((d: any) => d.msg || JSON.stringify(d)).join('; ');
      } else if (detail) {
        errorMessage = JSON.stringify(detail);
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // Non-JSON error
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const api = {
  get: (endpoint: string, options?: RequestInit) => fetchClient(endpoint, { ...options, method: 'GET' }),
  post: (endpoint: string, data?: any, options?: RequestInit) => fetchClient(endpoint, { ...options, method: 'POST', body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined) }),
  put: (endpoint: string, data?: any, options?: RequestInit) => fetchClient(endpoint, { ...options, method: 'PUT', body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined) }),
  delete: (endpoint: string, options?: RequestInit) => fetchClient(endpoint, { ...options, method: 'DELETE' }),
};
