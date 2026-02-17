import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Importaremos las pantallas (que crearemos a continuación)
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }: any) => ({
                        title: 'Turismo App',
                        headerRight: () => (
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={() => navigation.navigate('Favorites')}>
                                <Text style={styles.headerButtonText}>★ Favoritos</Text>
                            </TouchableOpacity>
                        ),
                        headerLeft: () => (
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={() => navigation.navigate('About')}>
                                <Text style={styles.headerButtonText}>Info</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalle del Lugar' }} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Mis Favoritos' }} />
                <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Acerca de' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginHorizontal: 10,
        padding: 5,
    },
    headerButtonText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});

export default AppNavigator;
