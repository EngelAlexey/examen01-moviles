import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = ({ developerName }: { developerName: string }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Primera Prueba Parcial</Text>
            <Text style={styles.text}>Desarrolla por: {developerName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Footer;
