import { apiClient } from './api';

export const getArtists = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient.get('/artists', {
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

export const searchArtistsByName = async (name, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const response = await apiClient.get(`/artists/search/${name}`, {
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

export const createArtist = async (data) => {
    try {
        const response = await apiClient.post('/artists', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка создания артиста:', error);
        throw error;
    }
};

export const getArtistById = async (id) => {
    try {
        const response = await apiClient.get(`/artists/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateArtist = async (id, formData, contentType) => {
    try {
        const response = await apiClient.patch(`/artists/${id}`, formData, {
            headers: {
                'Content-Type': contentType,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
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