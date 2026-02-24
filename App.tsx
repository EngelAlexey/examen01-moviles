import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { getToken, getUserData, getCart } from './src/utils/storage';
import { setAuth } from './src/redux/slices/authSlice';
import { setCart } from './src/redux/slices/cartSlice';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      const token = await getToken();
      const user = await getUserData();
      const cartItems = await getCart();

      if (token && user) {
        dispatch(setAuth({ token, user }));
      }
      if (cartItems.length > 0) {
        dispatch(setCart(cartItems));
      }
    };

    initApp();
  }, [dispatch]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
