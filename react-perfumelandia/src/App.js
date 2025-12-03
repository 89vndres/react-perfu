import AppRoutes from './app/routes';
import { AppProvider } from './context/AppContext'; 
import { AuthProvider } from './context/AuthContext'; // <--- Nuevo Contexto

function App(){ 
    return (
        <AuthProvider>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </AuthProvider>
    );
}

export default App;