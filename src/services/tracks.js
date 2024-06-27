import { apiClient } from './api';

export const getTracks = async () => {
    try {
        const response = await apiClient.get('/tracks', {});
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке треков:', error);
        throw error;
    }
};

export const searchTracksByName = async (title) => {
    try {
        const response = await apiClient.get(`/tracks/search/${title}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при поиске треков по названию "${title}":`, error);
        throw error;
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

export const getTracksWithoutReleases = async () => {
    try {
        const response = await apiClient.get('/tracks/admin/withoutRelease');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTrackById = async (id) => {
    try {
        const response = await apiClient.get(`/tracks/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const updateTrack = async (id, formData) => {
    try {
        const response = await apiClient.patch(`/tracks/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const deleteTrack = async (id) => {
    try {
        const response = await apiClient.delete(`/tracks/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const incrementViews = async (id) => {
    try {
        const response = await apiClient.get(`/tracks/view/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const searchReleasedTracks = async (name) => {
    try {
        const response = await apiClient.get(`/tracks/search-released/${name}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getReleasedTracks = async () => {
    try {
        const response = await apiClient.get('/tracks/user/released');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getTopTracks = async () => {
    try {
        const response = await apiClient.get('/tracks/user/top');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};