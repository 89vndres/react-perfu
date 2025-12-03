import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Aquí guardamos datos del usuario (rol, email)
    const [token, setToken] = useState(localStorage.getItem('token')); // Recuperamos token si existe

    useEffect(() => {
        // Al cargar, si hay token guardado, intentamos recuperar la sesión (opcional, simplificado aquí)
        const savedRole = localStorage.getItem('role');
        const savedEmail = localStorage.getItem('email');
        if (token && savedRole) {
            setUser({ role: savedRole, email: savedEmail });
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            // AJUSTA LA URL A TU BACKEND REAL
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }) // Ajusta según tu backend requiera 'username' o 'email'
            });

            if (!response.ok) throw new Error('Credenciales incorrectas');

            const data = await response.json();
            // Asumimos que el backend devuelve: { token: "...", user: { role: "admin", email: "..." } }
            // ADAPTA ESTA PARTE A TU RESPUESTA JSON REAL
            const receivedToken = data.token || data.access_token; 
            const receivedRole = data.user?.role || data.role || 'user'; 

            setToken(receivedToken);
            setUser({ role: receivedRole, email: email });

            // Guardar en navegador para no perder sesión al refrescar
            localStorage.setItem('token', receivedToken);
            localStorage.setItem('role', receivedRole);
            localStorage.setItem('email', email);
            
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}