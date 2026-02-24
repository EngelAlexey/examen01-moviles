import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    TOKEN: '@auth_token',
    USER_DATA: '@user_data',
    CART: '@cart_items',
};

export const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (e) {
        console.error('Error saving token', e);
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (e) {
        console.error('Error getting token', e);
        return null;
    }
};

export const saveUserData = async (userData: any) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (e) {
        console.error('Error saving user data', e);
    }
};

export const getUserData = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error getting user data', e);
        return null;
    }
};

export const saveCart = async (cartItems: any[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch (e) {
        console.error('Error saving cart', e);
    }
};

export const getCart = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.CART);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error getting cart', e);
        return [];
    }
};

export const clearAuthStorage = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (e) {
        console.error('Error clearing auth storage', e);
    }
};

export const clearCartStorage = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.CART);
    } catch (e) {
        console.error('Error clearing cart storage', e);
    }
};
