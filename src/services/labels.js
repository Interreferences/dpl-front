import { apiClient } from './api';

export const getLabels = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient.get('/labels', {
            params: {
                page,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка получения лейблов:', error);
        throw error;
    }
};

export const searchLabelsByName = async (name, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const response = await apiClient.get(`/labels/search/${name}`, {
            params: {
                limit,
                offset,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при поиске лейблов:', error);
        throw error;
    }
};

export const createLabel = async (data) => {
    try {
        const response = await apiClient.post('/labels', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка создания лейбла:', error);
        throw error;
    }
};

export const getLabelById = async (id) => {
    try {
        const response = await apiClient.get(`/labels/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const updateLabel = async (id, formData) => {
    try {
        const response = await apiClient.patch(`/labels/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const deleteLabel = async (id) => {
    try {
        const response = await apiClient.delete(`/labels/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

