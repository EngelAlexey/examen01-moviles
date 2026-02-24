import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToken, saveUserData, clearAuthStorage } from '../../utils/storage';

interface AuthState {
    token: string | null;
    user: any | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },

        loginSuccess: (state, action: PayloadAction<{ token: string; user: any }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.loading = false;
            saveToken(action.payload.token);
            saveUserData(action.payload.user);
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            clearAuthStorage();
        },
        setAuth: (state, action: PayloadAction<{ token: string | null; user: any | null }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = !!action.payload.token;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
