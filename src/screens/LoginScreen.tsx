import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import api from '../api';

// Login screen component for user authentication
const LoginScreen = () => {
    const [username, setUsername] = useState('johnd');
    const [password, setPassword] = useState('m38rmF$');
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);

    // Handles the login process and API request
    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Por favor ingrese usuario y contraseña');
            return;
        }

        dispatch(loginStart());
        try {
            const response = await api.post('/auth/login', {
                username,
                password,
            });

            if (response.data.token) {
                const userData = {
                    name: 'John Doe',
                    username: username,
                    email: 'john@gmail.com',
                };

                dispatch(loginSuccess({
                    token: response.data.token,
                    user: userData
                }));
            }
        } catch (error: any) {
            console.error(error);
            dispatch(loginFailure());
            Alert.alert('Error de Autenticación', 'Usuario o contraseña incorrectos');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Fake Store Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Ingresar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34495e'
    },
    card: {
        width: '85%',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#2c3e50'
    },
    input: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#e67e22',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default LoginScreen;
