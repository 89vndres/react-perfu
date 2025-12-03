import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Login from '../pages/Login';
import Contact from '../pages/Contact';
import AddProduct from '../pages/AddProduct';
import AdminPanel from '../pages/AdminPanel';
import EditProduct from '../pages/EditProduct';

function AppRoutes(){
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/contacto" element={<Contact />} />
                
                {/* Rutas de Administración (Protegidas por lógica interna de cada página) */}
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/agregar" element={<AddProduct />} />
                <Route path="/editar/:id" element={<EditProduct />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;