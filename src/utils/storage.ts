// Utility functions for local asynchronous storage management
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    TOKEN: '@auth_token',
    USER_DATA: '@user_data',
    CART: '@cart_items',
};

// Saves authentication token to local storage
export const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (e) {
        console.error('Error saving token', e);
    }
};

// Retrieves authentication token from local storage
export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (e) {
        console.error('Error getting token', e);
        return null;
    }
};

// Saves user data to local storage
export const saveUserData = async (userData: any) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (e) {
        console.error('Error saving user data', e);
    }
};

// Retrieves user data from local storage
export const getUserData = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error getting user data', e);
        return null;
    }
};

// Saves cart items to local storage
export const saveCart = async (cartItems: any[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch (e) {
        console.error('Error saving cart', e);
    }
};

// Retrieves cart items from local storage
export const getCart = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.CART);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error getting cart', e);
        return [];
    }
};

// Clears authentication data from local storage
export const clearAuthStorage = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (e) {
        console.error('Error clearing auth storage', e);
    }
};

// Clears cart data from local storage
export const clearCartStorage = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.CART);
    } catch (e) {
        console.error('Error clearing cart storage', e);
    }
};
