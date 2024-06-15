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

export const getArtists = async () => {
    try {
        const response = await apiClient.get('/artists');
        return response.data; // Возвращаем данные из ответа
    } catch (error) {
        throw error; // Обрабатываем ошибку, если произошла
    }
};