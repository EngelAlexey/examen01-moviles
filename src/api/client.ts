import axios from 'axios';

// Definición básica de la interfaz del lugar
export interface Place {
    id: string | number;
    name?: string;
    title?: string;
    address?: { text: string };
    category?: string;
    [key: string]: any;
}

const apiClient = axios.create({
    baseURL: 'http://wafi.iit.cnr.it/openervm/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getPlaces = async (
    location: string = 'Barcelona',
    category: string = 'poi',
    keyword: string = ''
) => {
    try {
        console.log(`[API Request] Buscando: ${location}, ${category}, kw: ${keyword}`);

        const response = await apiClient.get('/getPlaces', {
            params: {
                location,
                category,
                keyword,
            },
        });

        console.log('[API Response Status]:', response.status);
        // Verificar estructura de respuesta
        return response.data;
    } catch (error) {
        console.error("[API Error]:", error);
        throw error;
    }
};

export default apiClient;
