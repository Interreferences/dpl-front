import {apiClient} from "@/services/api.js";

// Метод для создания плейлиста
export const createPlaylist = async (formData) => {
    try {
        const response = await apiClient.post('/playlists', formData);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error creating playlist:', error.response.status, error.response.data);
        } else {
            console.error('Error creating playlist:', error.message);
        }
        throw error;
    }
};

// Метод для добавления трека в плейлист
export const addTrackToPlaylist = async (playlistId, trackId) => {
    try {
        const response = await apiClient.post(`/playlists/${playlistId}/tracks/${trackId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error adding track to playlist:', error.response.status, error.response.data);
        } else {
            console.error('Error adding track to playlist:', error.message);
        }
        throw error;
    }
};

// Метод для удаления трека из плейлиста
export const deleteTrackFromPlaylist = async (playlistId, trackId) => {
    try {
        const response = await apiClient.delete(`/playlists/${playlistId}/tracks/${trackId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error deleting track from playlist:', error.response.status, error.response.data);
        } else {
            console.error('Error deleting track from playlist:', error.message);
        }
        throw error;
    }
};

// Метод для получения плейлиста по ID
export const getPlaylistById = async (id) => {
    try {
        const response = await apiClient.get(`/playlists/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error getting playlist by ID:', error.response.status, error.response.data);
        } else {
            console.error('Error getting playlist by ID:', error.message);
        }
        throw error;
    }
};

// Метод для получения плейлистов пользователя по userID
export const getPlaylistsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/playlists/user/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error getting playlists by user ID:', error.response.status, error.response.data);
        } else {
            console.error('Error getting playlists by user ID:', error.message);
        }
        throw error;
    }
};

// Метод для удаления плейлиста по ID
export const deletePlaylist = async (id) => {
    try {
        const response = await apiClient.delete(`/playlists/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error deleting playlist:', error.response.status, error.response.data);
        } else {
            console.error('Error deleting playlist:', error.message);
        }
        throw error;
    }
};

// Метод для обновления плейлиста по ID
export const updatePlaylist = async (id, dto) => {
    try {
        const response = await apiClient.put(`/playlists/${id}`, dto);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error updating playlist:', error.response.status, error.response.data);
        } else {
            console.error('Error updating playlist:', error.message);
        }
        throw error;
    }
};
