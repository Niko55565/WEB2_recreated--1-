const API_URL = 'http://localhost:3001';

export const apiRequest = async (path, options = {}) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || 'Ошибка сервера');
    }

    return data;
};
