import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/slices/favoritesSlice';
import { RootState } from '../redux/store';

const FavoritesScreen = () => {
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mis 5 Lugares ({favorites.length}/5)</Text>

            <FlatList
                data={favorites}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.title || item.name}</Text>
                            <Text>{item.address?.text}</Text>
                        </View>
                        <Button
                            title="Borrar"
                            color="red"
                            onPress={() => dispatch(removeFavorite(item.id))}
                        />
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No tienes favoritos guardados.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: 'white', marginBottom: 10, borderRadius: 8 },
    title: { fontWeight: 'bold', fontSize: 16 },
    empty: { textAlign: 'center', marginTop: 30, color: 'gray' }
});

export default FavoritesScreen;
