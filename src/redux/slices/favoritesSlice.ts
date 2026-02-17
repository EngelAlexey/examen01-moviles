import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Place {
    id: string | number;
    title: string;
    name?: string;
    address?: { text: string };
    category?: string;
    website?: string;
    url?: string;
}

interface FavoritesState {
    items: Place[];
}

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Place>) => {
            // Check if already exists
            const exists = state.items.find(item => item.id === action.payload.id);
            if (!exists && state.items.length < 5) {
                state.items.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<string | number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setFavorites: (state, action: PayloadAction<Place[]>) => {
            state.items = action.payload;
        },
    },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
