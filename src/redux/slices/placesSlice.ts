import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Place {
    id: string | number;
    title: string;
    name?: string;
    address?: { text: string };
    category?: string;
    website?: string;
    url?: string;
}

interface PlacesState {
    list: Place[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Define the initial state
const initialState: PlacesState = {
    list: [],
    status: 'idle',
    error: null,
};

// Async thunk to fetch places
// Using Nominatim OpenStreetMap API as a placeholder since no API was provided.
export const fetchPlaces = createAsyncThunk(
    'places/fetchPlaces',
    async ({ location, category, keyword }: { location: string; category: string; keyword: string }) => {
        try {
            // Construct query for Nominatim
            // Note: This is a best-effort implementation to make the app functional.
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: `${keyword} ${category} ${location}`,
                    format: 'json',
                    addressdetails: 1,
                    limit: 10
                },
                headers: {
                    'User-Agent': 'TourismApp/1.0' // Nominatim requires User-Agent
                }
            });

            return response.data.map((item: any) => ({
                id: item.place_id,
                title: item.display_name.split(',')[0], // Simulating title
                name: item.display_name,
                address: { text: item.display_name },
                category: item.type,
                url: `https://www.openstreetmap.org/${item.osm_type}/${item.osm_id}`,
                website: null
            }));
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    }
);

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
                state.error = null;
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error fetching places';
            });
    },
});

export default placesSlice.reducer;
