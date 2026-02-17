import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Linking, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/slices/favoritesSlice';
import { RootState } from '../redux/store';

const DetailScreen = ({ route }: any) => {
    const { place } = route.params;
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);

    const handleAddFavorite = () => {
        if (favorites.length >= 5) {
            Alert.alert("Límite Alcanzado", "Solo puedes tener 5 favoritos.");
            return;
        }
        dispatch(addFavorite(place));
        Alert.alert("¡Éxito!", "Añadido a favoritos");
    };

    const openWebsite = () => {
        // Intentar obtener URL de diferentes propiedades posibles de la API
        const url = place.website || place.url;
        if (url) {
            Linking.openURL(url).catch(err => console.error("Error al abrir URL", err));
        } else {
            Alert.alert("Aviso", "Este lugar no tiene sitio web registrado.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{place.title || place.name}</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Dirección:</Text>
                <Text>{place.address?.text || 'No disponible'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Categoría:</Text>
                <Text>{place.category || 'General'}</Text>
            </View>

            {/* Agregar más campos según lo que devuelva la API */}

            <View style={styles.buttonContainer}>
                <Button title="Ver Sitio Web" onPress={openWebsite} color="#007AFF" />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Agregar a Favoritos" onPress={handleAddFavorite} color="#FF9500" />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    section: { marginBottom: 15 },
    label: { fontWeight: 'bold', fontSize: 16 },
    buttonContainer: { marginTop: 10 }
});

export default DetailScreen;
