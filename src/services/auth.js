import { apiClient } from './api';

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Ошибка сети');
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await apiClient.post('/users/login', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Ошибка сети');
    }
};