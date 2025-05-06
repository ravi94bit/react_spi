import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('authToken') || null;
const userName = localStorage.getItem('name') || '';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    user: {
      name: userName,
    },
    isAuthenticated: !!token,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
