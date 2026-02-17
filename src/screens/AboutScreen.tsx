import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Información del Proyecto</Text>

            <Text style={styles.label}>Curso:</Text>
            <Text style={styles.value}>ITI-721 - Desarrollo de Apps Móviles II</Text>

            <Text style={styles.label}>Profesor:</Text>
            <Text style={styles.value}>Jorge Ruiz (york)</Text>

            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>16/febrero/2026</Text>

            <Text style={styles.label}>Estudiante:</Text>
            <Text style={styles.value}>[TU NOMBRE AQUÍ]</Text>

            <Text style={styles.footer}>Universidad Técnica Nacional</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#003366' },
    label: { fontSize: 16, fontWeight: 'bold', color: '#555', marginTop: 10 },
    value: { fontSize: 18, marginBottom: 5 },
    footer: { marginTop: 50, textAlign: 'center', fontStyle: 'italic', color: '#999' }
});

export default AboutScreen;
