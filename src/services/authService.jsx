// src/services/authService.js
import axios from "axios";
import { AUTH } from "../config/endpoints";

export const loginUser = (data) => axios.post(AUTH.LOGIN, data);

export const registerUser = (data) => axios.post(AUTH.REGISTER, data);

export const forgetPassword = (data) => axios.post(AUTH.FORGOT_PASSWORD, data);

export const resetPassword = (data) => axios.post(AUTH.RESET_PASSWORD, data);

export const logoutUser = async (token) => {             
    return axios.post(AUTH.LOGOUT, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};