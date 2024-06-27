import { apiClient } from './api';

export const getGenres = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient.get('/genres', {
            params: {
                page,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка получения жанров:', error);
        throw error;
    }
};

export const searchGenresByName = async (name, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const response = await apiClient.get(`/genres/search/${name}`, {
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

export const createGenre = async (data) => {
    try {
        const response = await apiClient.post('/genres', data, {
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

export const getGenreById = async (id) => {
    try {
        const response = await apiClient.get(`/genres/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const deleteGenre = async (id) => {
    try {
        const response = await apiClient.delete(`/genres/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const updateGenre = async (id, formData) => {
    try {
        const response = await apiClient.patch(`/genres/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};