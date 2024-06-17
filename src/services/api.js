// services/api.js
import axios from 'axios';

// Функция для создания и настройки клиента Axios
export const createApiClient = (baseURL) => {
    const apiClient = axios.create({
        baseURL,
    });

    // Возвращаем настроенный клиент Axios
    return apiClient;
};

// Создаем клиент для базового URL
export const apiClient = createApiClient('http://localhost:7000/api');

// Асинхронная функция для создания артиста
export const createArtist = async (formData) => {
    try {
        const response = await apiClient.post('/artists', formData);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const createGenre = async (data) => {
    try {
        const response = await apiClient.post('/genres', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const createTrack = async (formData) => {
    try {
        const response = await apiClient.post('/tracks', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
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

export const createLabel = async (data) => {
    try {
        const response = await apiClient.post('/labels', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getArtists = async () => {
    try {
        const response = await apiClient.get('/artists');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getGenres = async () => {
    try {
        const response = await apiClient.get('/genres');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getLabels = async () => {
    try {
        const response = await apiClient.get('/labels');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getTracks = async () => {
    try {
        const response = await apiClient.get('/tracks');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getReleases = async () => {
    try {
        const response = await apiClient.get('/releases');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getTracksWithoutReleases = async () => {
    try {
        const response = await apiClient.get('/tracks/withoutRelease');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};