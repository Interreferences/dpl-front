import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        setUser(userData) {
            this.user = userData;
        },
        clearUser() {
            this.user = null;
        },
        isAuthenticated() {
            return !!this.user; // Возвращает true, если пользователь не null или undefined
        },
        isAdmin() {
            return this.isAuthenticated() && this.user.role && this.user.role.title === 'Admin';
        },
        // Проверка аутентификации перед доступом к странице
        requireAuth(to) {
            const router = useRouter();
            if (!this.isAuthenticated()) {
                router.push('/auth/login');
                return false; // Не аутентифицирован
            } else {
                return true; // Аутентифицирован
            }
        },
    },
});