import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import ProductGrid from '../components/products/ProductGrid';
import Filters from '../components/products/Filters';

export default function Products() {
    const { addToCart } = useCart();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para filtros
    const [activeFilters, setActiveFilters] = useState({
        genders: [], brands: [], aromas: [], maxPrice: null
    });

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/perfume');
            if (response.ok) {
                const data = await response.json();
                const list = Array.isArray(data) ? data : data.data || [];
                setAllProducts(list);
                setFilteredProducts(list);
            }
        } catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };

    useEffect(() => { fetchProducts(); }, []);

    const uniqueBrands = [...new Set(allProducts.map(p => p.marca).filter(Boolean))];

    const handleFilterChange = ({ type, name, value, checked }) => {
        const newFilters = { ...activeFilters };
        if (type === 'priceMax') {
            newFilters.maxPrice = value ? Number(value) : null;
        } else {
            const listKey = type === 'gender' ? 'genders' : type === 'brand' ? 'brands' : 'aromas';
            if (checked) newFilters[listKey].push(name);
            else newFilters[listKey] = newFilters[listKey].filter(item => item !== name);
        }
        setActiveFilters(newFilters);
        applyFilters(newFilters);
    };

    const applyFilters = (filters) => {
        let result = allProducts;
        if (filters.genders.length > 0) result = result.filter(p => filters.genders.includes(p.category));
        if (filters.brands.length > 0) result = result.filter(p => filters.brands.includes(p.marca));
        if (filters.aromas.length > 0) result = result.filter(p => filters.aromas.includes(p.aroma));
        if (filters.maxPrice !== null) result = result.filter(p => Number(p.precio) <= filters.maxPrice);
        setFilteredProducts(result);
    };

    // Render de carga o error
    if (loading) return (
        <Container fluid className="vh-100 d-flex justify-content-center align-items-center" style={{backgroundColor: '#050505'}}>
            <Spinner animation="border" variant="warning" />
        </Container>
    );

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#ffffffff', // FONDO NEGRO PRINCIPAL
            color: '#e0e0e0',
            paddingTop: '20px'
        }}>
            <Container fluid className="px-5"> {/* fluid + px-5 para usar todo el ancho pero con margen */}
                
                <h2 className="mb-4 text-center fw-bold" style={{ 
                    color: '#d4af37', 
                    fontFamily: "'Playfair Display', serif", 
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}>
                    Catálogo Exclusivo
                </h2>
                
                <Row>
                    {/* --- COLUMNA IZQUIERDA: FILTROS (Más estrecha: md={2}) --- */}
                    <Col lg={2} md={3} className="mb-4">
                        <Filters 
                            onFilterChange={handleFilterChange} 
                            brands={uniqueBrands} 
                        />
                    </Col>

                    {/* --- COLUMNA DERECHA: PRODUCTOS (Más ancha: md={10}) --- */}
                    <Col lg={10} md={9}>
                        {filteredProducts.length === 0 ? (
                            <Alert variant="dark" className="text-center border-secondary text-light">
                                No se encontraron productos con esos filtros.
                            </Alert>
                        ) : (
                            // Pasamos un prop extra para indicar que use estilos oscuros
                            <ProductGrid items={filteredProducts} onAdd={addToCart} onReload={fetchProducts} darkMode={true} />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}