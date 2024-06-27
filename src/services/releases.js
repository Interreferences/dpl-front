import { apiClient } from './api';

export const getReleases = async () => {
    try {
        const response = await apiClient.get('/releases', {});
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке релизов:', error);
        throw error;
    }
};

export const searchReleasesByName = async (title) => {
    try {
        const response = await apiClient.get(`/releases/search/${title}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при поиске релизов по названию "${title}":`, error);
        throw error;
    }
};

export const createRelease = async (formData) => {
    try {
        const response = await apiClient.post('/releases', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getReleaseById = async (id) => {
    try {
        const response = await apiClient.get(`/releases/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const deleteRelease = async (id) => {
    try {
        const response = await apiClient.delete(`/releases/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const updateRelease = async (id, formData) => {
    try {
        const response = await apiClient.patch(`/releases/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};