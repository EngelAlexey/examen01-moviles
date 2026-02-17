import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPlaces, Place } from '../../api/client';

interface PlacesState {
    list: Place[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PlacesState = {
    list: [],
    status: 'idle',
    error: null,
};

export const fetchPlaces = createAsyncThunk(
    'places/fetchPlaces',
    async ({ location, category, keyword }: { location?: string; category?: string; keyword?: string }, { rejectWithValue }) => {
        try {
            const response = await getPlaces(location, category, keyword);

            console.log('--- DEBUG API RESPONSE ---');
            console.log('Keyword:', keyword);
            console.log('Data:', JSON.stringify(response).substring(0, 500));

            if (Array.isArray(response)) {
                return response;
            }

            if (response && Array.isArray(response.data)) {
                return response.data;
            }

            if (response && Array.isArray(response.results)) {
                return response.results;
            }

            if (response && typeof response === 'object' && (response.id || response.name || response.title)) {
                console.log('Detectado objeto único, convirtiendo a array');
                return [response];
            }

            console.warn("Estructura de respuesta no reconocida por el Slice:", response);
            return [];
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error al conectar con el servidor');
        }
    }
);

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        clearPlaces: (state) => {
            state.list = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPlaces.fulfilled, (state, action: PayloadAction<Place[]>) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { clearPlaces } = placesSlice.actions;
export default placesSlice.reducer;