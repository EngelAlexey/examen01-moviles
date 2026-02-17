import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFavorites } from './src/redux/slices/favoritesSlice';

// Componente Wrapper para manejar la carga inicial de datos
const MainApp = () => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@favorites');
        if (jsonValue != null) {
          const savedFavorites = JSON.parse(jsonValue);
          store.dispatch(setFavorites(savedFavorites));
        }
      } catch (e) {
        console.error("Error cargando favoritos", e);
      }
    };

    loadData();

    // Suscripción para guardar cambios automáticamente
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const favorites = state.favorites.items;
      AsyncStorage.setItem('@favorites', JSON.stringify(favorites))
        .catch(err => console.error("Error guardando favoritos", err));
    });

    return () => unsubscribe();
  }, []);

  return <AppNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
