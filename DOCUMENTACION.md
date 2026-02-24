# Documentación Externa - Fake Store App

Este documento detalla el proceso de creación, configuración y funcionamiento de la aplicación Fake Store App para la Primera Prueba Parcial.

## 1. Guía Paso a Paso

### Paso 1: Inicialización del Proyecto
Se creó el proyecto utilizando React Native con TypeScript.
Se configuró la estructura de carpetas `src/` para mantener el código ordenado y escalable:
- `api/`: Configuración de Axios.
- `redux/`: Estado global con Slices.
- `navigation/`: Enrutador de la aplicación.
- `screens/`: Vistas principales.
- `components/`: Elementos reutilizables.
- `utils/`: Utilidades como almacenamiento persistente.

### Paso 2: Instalación de Dependencias
Se instalaron las siguientes librerías clave:
```bash
npm install axios @reduxjs/toolkit react-redux @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage
```

### Paso 3: Configuración Base
- **Axios**: Se creó una instancia base apuntando a `https://fakestoreapi.com`.
- **Redux**: Se implementaron dos slices: `authSlice` (autenticación) y `cartSlice` (carrito de compras). Ambos incluyen persistencia con `AsyncStorage`.

### Paso 4: Navegación y Pantallas
Se implementó un `Stack Navigator` con lógica de protección:
- Si no hay token, se muestra la pantalla de `Login`.
- Al autenticarse, se habilita el acceso al `Catálogo`, `Detalle` y `Carrito`.

## 2. Funcionamiento de la Aplicación (Módulos Relevantes)

- **Login**: Utiliza el endpoint `/auth/login`. Al tener éxito, guarda el token y un objeto de usuario simulado localmente.
- **Catálogo**: Muestra los productos en una cuadrícula de 2 columnas. Permite filtrar por categorías dinámicamente.
- **Carrito**: Calcula subtotales y el total automáticamente. Los cambios se guardan en el dispositivo para que los datos no se pierdan al cerrar la app.

## 3. Comandos Útiles
- Iniciar aplicación: `npm run android` / `npm run ios`
- Limpiar caché: `npm start -- --reset-cache`

---
*Desarrollado por: Merlina Addams*
