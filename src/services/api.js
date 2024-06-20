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
export const apiClient = createApiClient('http://188.130.154.92:7000/api');

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

// Асинхронная функция для поиска артистов по имени
export const searchArtistsByName = async (name) => {
    try {
        const response = await apiClient.get(`/artists/search/${name}`);
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

export const searchTracksByName = async (name) => {
    try {
        const response = await apiClient.get(`/tracks/search-admin/${name}`);
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
        const response = await apiClient.get('/tracks/released');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getTopTracks = async () => {
    try {
        const response = await apiClient.get('/tracks/top');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const getLastArtists = async () => {
    try {
        const response = await apiClient.get('/artists/last');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const searchReleasesByName = async (name) => {
    try {
        const response = await apiClient.get(`/releases/search/${name}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const searchLabelsByName = async (name) => {
    try {
        const response = await apiClient.get(`/labels/search/${name}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const searchGenresByName = async (name) => {
    try {
        const response = await apiClient.get(`/genres/search/${name}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

// Асинхронная функция для получения артиста по ID
export const getArtistById = async (id) => {
    try {
        const response = await apiClient.get(`/artists/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
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

export const getLabelById = async (id) => {
    try {
        const response = await apiClient.get(`/labels/${id}`);
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

export const getTrackById = async (id) => {
    try {
        const response = await apiClient.get(`/tracks/${id}`);
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

export const deleteLabel = async (id) => {
    try {
        const response = await apiClient.delete(`/labels/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const deleteArtist = async (id) => {
    try {
        const response = await apiClient.delete(`/artists/${id}`);
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

export const deleteRelease = async (id) => {
    try {
        const response = await apiClient.delete(`/releases/${id}`);
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};

export const updateArtist = async (id, formData) => {
    try {
        const response = await apiClient.patch(`/artists/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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