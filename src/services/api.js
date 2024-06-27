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
export const apiClient = createApiClient('http://185.159.128.11:5000/api');