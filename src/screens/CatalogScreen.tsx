import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import api from '../api';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { addToCart } from '../redux/slices/cartSlice';

const CatalogScreen = ({ navigation }: any) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                api.get('/products'),
                api.get('/products/categories')
            ]);
            setProducts(productsRes.data);
            setCategories(categoriesRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter((p: any) => p.category === selectedCategory);

    const renderProduct = ({ item }: { item: any }) => (
        <ProductCard
            product={item}
            onPress={() => navigation.navigate('Detail', { productId: item.id })}
            onAddToCart={() => dispatch(addToCart(item))}
        />
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e67e22" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                        style={[styles.filterButton, selectedCategory === 'all' && styles.activeFilter]}
                        onPress={() => setSelectedCategory('all')}
                    >
                        <Text style={[styles.filterText, selectedCategory === 'all' && styles.activeFilterText]}>Todos</Text>
                    </TouchableOpacity>
                    {categories.map((cat: string) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.filterButton, selectedCategory === cat && styles.activeFilter]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[styles.filterText, selectedCategory === cat && styles.activeFilterText]}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={(item: any) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.listContent}
            />

            <Footer developerName="Alex Herrera" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    filterContainer: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#ecf0f1',
    },
    activeFilter: {
        backgroundColor: '#e67e22',
    },
    filterText: {
        color: '#7f8c8d',
        fontWeight: '600',
    },
    activeFilterText: {
        color: '#fff',
    },
    listContent: {
        padding: 8,
    },
});

export default CatalogScreen;
