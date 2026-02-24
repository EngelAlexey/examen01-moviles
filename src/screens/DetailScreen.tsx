import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import api from '../api';
import { addToCart } from '../redux/slices/cartSlice';

// Detail screen component showing specific product information
const DetailScreen = ({ route }: any) => {
    const { productId } = route.params;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    // Fetches specific product data from the API
    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e67e22" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Producto no encontrado</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            <View style={styles.infoContainer}>
                <Text style={styles.category}>{product.category.toUpperCase()}</Text>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.description}>{product.description}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => dispatch(addToCart(product))}
                >
                    <Text style={styles.buttonText}>Añadir al Carrito</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: 300, marginVertical: 20 },
    infoContainer: { padding: 20 },
    category: { color: '#7f8c8d', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
    price: { fontSize: 22, fontWeight: 'bold', color: '#e67e22', marginBottom: 15 },
    description: { fontSize: 16, color: '#34495e', lineHeight: 24, marginBottom: 30 },
    button: {
        backgroundColor: '#2980b9',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default DetailScreen;
