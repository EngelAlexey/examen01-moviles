import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, clearCart } from '../redux/slices/cartSlice';

// Cart screen component displaying added items and total amount
const CartScreen = ({ navigation }: any) => {
    const { items, totalAmount } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    // Handles the payment confirmation and layout transition
    const handlePayment = () => {
        Alert.alert(
            "Confirmar Pago",
            "¿Desea proceder con la compra?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Pagar",
                    onPress: () => {
                        dispatch(clearCart());
                        Alert.alert("Éxito", "Compra realizada con éxito");
                        navigation.navigate('Catalog');
                    }
                }
            ]
        );
    };

    // Renders individual cart item
    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
                <Text style={styles.itemSubtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => dispatch(removeFromCart(item.id))}
            >
                <Text style={styles.removeButtonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {items.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Tu carrito está vacío</Text>
                    <TouchableOpacity
                        style={styles.goBackButton}
                        onPress={() => navigation.navigate('Catalog')}
                    >
                        <Text style={styles.goBackButtonText}>Ir a comprar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                    />
                    <View style={styles.summaryContainer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total:</Text>
                            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.clearButton]}
                                onPress={() => dispatch(clearCart())}
                            >
                                <Text style={styles.actionButtonText}>Vaciar Carrito</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.payButton]}
                                onPress={handlePayment}
                            >
                                <Text style={styles.actionButtonText}>Pagar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontSize: 18, color: '#7f8c8d', marginBottom: 20 },
    goBackButton: { backgroundColor: '#e67e22', padding: 15, borderRadius: 5 },
    goBackButtonText: { color: '#fff', fontWeight: 'bold' },
    listContent: { padding: 15 },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 2,
    },
    itemImage: { width: 60, height: 60 },
    itemInfo: { flex: 1, marginLeft: 15 },
    itemTitle: { fontSize: 14, fontWeight: 'bold', color: '#2c3e50' },
    itemQuantity: { fontSize: 12, color: '#7f8c8d' },
    itemSubtotal: { fontSize: 14, fontWeight: '600', color: '#e67e22' },
    removeButton: { padding: 8 },
    removeButtonText: { color: '#e74c3c', fontSize: 12, fontWeight: 'bold' },
    summaryContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    totalLabel: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
    totalValue: { fontSize: 20, fontWeight: 'bold', color: '#e67e22' },
    actions: { flexDirection: 'row', gap: 10 },
    actionButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center' },
    clearButton: { backgroundColor: '#95a5a6' },
    payButton: { backgroundColor: '#27ae60' },
    actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default CartScreen;
