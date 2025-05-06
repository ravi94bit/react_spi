export const BASE_URL = import.meta.env.VITE_HOST_URL;

export const AUTH = {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    LOGOUT: `${BASE_URL}/logout`,
    FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/reset-password`,
}

export default {
    AUTH,
  };