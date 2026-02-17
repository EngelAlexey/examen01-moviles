import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces } from '../redux/slices/placesSlice';
import { RootState, AppDispatch } from '../redux/store';

const HomeScreen = ({ navigation }: any) => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    // Acceder al estado de Redux
    const { list, status, error } = useSelector((state: RootState) => state.places);

    const handleSearch = () => {
        // Parámetros por defecto según examen: Location=Barcelona, Category=poi
        dispatch(fetchPlaces({ location: 'Barcelona', category: 'poi', keyword }));
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { place: item })}
        >
            <Text style={styles.cardTitle}>{item.title || item.name || 'Sin nombre'}</Text>
            <Text numberOfLines={2}>{item.address?.text || 'Dirección no disponible'}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar (ej. Sagrada Familia)..."
                    value={keyword}
                    onChangeText={setKeyword}
                />
                <Button title="Buscar" onPress={handleSearch} />
            </View>

            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={styles.error}>Error: {JSON.stringify(error)}</Text>}

            <FlatList
                data={list}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.empty}>No hay resultados</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
    searchSection: { flexDirection: 'row', marginBottom: 10 },
    input: { flex: 1, borderColor: '#ccc', borderWidth: 1, marginRight: 10, padding: 8, borderRadius: 5, backgroundColor: 'white' },
    card: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    error: { color: 'red', margin: 10 },
    empty: { textAlign: 'center', marginTop: 20, color: '#777' }
});

export default HomeScreen;
