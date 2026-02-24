import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductCardProps {
    product: any;
    onPress: () => void;
    onAddToCart: () => void;
}

const ProductCard = ({ product, onPress, onAddToCart }: ProductCardProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.button} onPress={onAddToCart}>
                    <Text style={styles.buttonText}>Añadir al carrito</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 120,
        backgroundColor: '#f9f9f9',
    },
    info: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        height: 40,
        color: '#333',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e67e22',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#2980b9',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default ProductCard;
