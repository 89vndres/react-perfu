import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useCart = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + (item.precio || item.price), 0);

    // --- NUEVO: FUNCIÓN PARA PAGAR ---
    const checkout = async (userEmail, token) => {
        if (!cart.length) return;

        // 1. Preparamos los datos como los pide el Backend
        // Agrupamos por producto para mandar cantidades
        const detalles = cart.map(item => ({
            perfumeId: item.id || item._id,
            nombreProducto: item.nombre || item.name,
            precioUnitario: item.precio || item.price,
            cantidad: 1 // Por simplicidad, cada item en el array cuenta como 1. (Podrías agruparlos)
        }));

        const orden = {
            usuarioEmail: userEmail,
            total: cartTotal,
            detalles: detalles
        };

        try {
            const response = await fetch('http://localhost:8080/ordenes', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orden)
            });

            if (response.ok) {
                clearCart(); // Vaciar carrito
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return (
        <AppContext.Provider value={{ 
            cart, addToCart, removeFromCart, clearCart, cartTotal, checkout, 
            cartCount: cart.length 
        }}>
            {children}
        </AppContext.Provider>
    );
};