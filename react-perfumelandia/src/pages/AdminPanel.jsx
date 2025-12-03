import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Image, Badge, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
    const { token } = useAuth();
    const [view, setView] = useState('dashboard'); // 'dashboard', 'products', 'orders'
    
    // Datos
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, lowStockCount: 0 });

    // Cargar Datos Iniciales
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // 1. Cargar Productos
            const resProd = await fetch('http://localhost:8080/perfume');
            const dataProd = await resProd.json();
            const prodList = Array.isArray(dataProd) ? dataProd : dataProd.data || [];
            setProducts(prodList);

            // 2. Cargar Órdenes
            const resOrd = await fetch('http://localhost:8080/ordenes/todas', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const dataOrd = await resOrd.json();
            setOrders(dataOrd);

            // 3. Calcular Estadísticas
            const totalSales = dataOrd.reduce((sum, ord) => sum + ord.total, 0);
            const lowStock = prodList.filter(p => (p.stock || 0) < 5).length;
            
            setStats({
                totalSales,
                totalOrders: dataOrd.length,
                lowStockCount: lowStock
            });

        } catch (error) {
            console.error("Error cargando datos del dashboard:", error);
        }
    };

    // Eliminar Producto
    const handleDeleteProduct = async (id) => {
        if(!window.confirm("¿Borrar definitivamente?")) return;
        await fetch(`http://localhost:8080/perfume/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchData(); // Recargar
    };

    // --- COMPONENTES INTERNOS DE LA VISTA ---

    const Sidebar = () => (
        <div className="d-flex flex-column p-3 text-white" style={{ width: '250px', minHeight: '100vh', background: 'rgba(0,0,0,0.8)', borderRight: '1px solid #d4af37' }}>
            <h4 className="mb-4 text-center" style={{ color: '#d4af37', fontFamily: "'Playfair Display', serif" }}>PANEL ADMIN</h4>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-2">
                    <button onClick={() => setView('dashboard')} className={`nav-link w-100 text-start ${view==='dashboard'?'active-gold':''}`} style={{color: 'white'}}>
                        📊 Resumen
                    </button>
                </li>
                <li className="nav-item mb-2">
                    <button onClick={() => setView('products')} className={`nav-link w-100 text-start ${view==='products'?'active-gold':''}`} style={{color: 'white'}}>
                        🧴 Productos & Stock
                    </button>
                </li>
                <li className="nav-item mb-2">
                    <button onClick={() => setView('orders')} className={`nav-link w-100 text-start ${view==='orders'?'active-gold':''}`} style={{color: 'white'}}>
                        📦 Pedidos
                    </button>
                </li>
            </ul>
            <hr />
            <Link to="/" className="btn btn-outline-light btn-sm">← Volver a la Tienda</Link>
        </div>
    );

    const MetricCard = ({ title, value, icon, color }) => (
        <Card className="bg-dark text-white border-0 shadow-sm h-100" style={{ borderLeft: `4px solid ${color}` }}>
            <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                    <h6 className="text-muted mb-1">{title}</h6>
                    <h3 className="fw-bold mb-0">{value}</h3>
                </div>
                <div style={{ fontSize: '2rem', color: color }}>{icon}</div>
            </Card.Body>
        </Card>
    );

    const SalesChart = () => (
        <Card className="bg-dark text-white border-0 shadow-sm p-3 mb-4">
            <h5 className="mb-4" style={{color: '#d4af37'}}>Rendimiento de Ventas (Simulado)</h5>
            <div className="d-flex justify-content-around align-items-end" style={{ height: '200px' }}>
                {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="d-flex flex-column align-items-center">
                        <div style={{ 
                            width: '30px', 
                            height: `${h}%`, 
                            backgroundColor: '#d4af37', 
                            borderRadius: '5px 5px 0 0',
                            opacity: 0.8
                        }}></div>
                        <small className="text-muted mt-2">D{i+1}</small>
                    </div>
                ))}
            </div>
        </Card>
    );

    return (
        <div className="d-flex" style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #050505 100%)', minHeight: '100vh' }}>
            {/* ESTILOS CSS LOCALES */}
            <style>{`
                .active-gold { background-color: #d4af37 !important; color: black !important; font-weight: bold; }
                .table-dark-custom { --bs-table-bg: transparent; --bs-table-color: white; border-color: #333; }
            `}</style>
            
            <Sidebar />

            <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                
                {/* --- VISTA: DASHBOARD --- */}
                {view === 'dashboard' && (
                    <div className="animate-fade-in">
                        <h2 className="text-white mb-4 fw-bold">Bienvenido, Admin</h2>
                        
                        {/* Tarjetas Métricas */}
                        <Row className="g-3 mb-4">
                            <Col md={4}>
                                <MetricCard 
                                    title="Ventas Totales" 
                                    value={`$${stats.totalSales.toLocaleString('es-CL')}`} 
                                    icon="💰" 
                                    color="#28a745" 
                                />
                            </Col>
                            <Col md={4}>
                                <MetricCard 
                                    title="Pedidos Realizados" 
                                    value={stats.totalOrders} 
                                    icon="🛒" 
                                    color="#17a2b8" 
                                />
                            </Col>
                            <Col md={4}>
                                <MetricCard 
                                    title="Stock Crítico" 
                                    value={`${stats.lowStockCount} Prod.`} 
                                    icon="⚠️" 
                                    color="#dc3545" 
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8}>
                                <SalesChart />
                            </Col>
                            <Col md={4}>
                                {/* Lista rápida de stock bajo */}
                                <Card className="bg-dark text-white border-0 p-3">
                                    <h5 className="text-danger mb-3">⚠️ Alerta de Stock</h5>
                                    {products.filter(p => (p.stock||0) < 5).slice(0, 5).map(p => (
                                        <div key={p.id} className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom border-secondary">
                                            <span>{p.nombre}</span>
                                            <Badge bg="danger">{p.stock || 0} u.</Badge>
                                        </div>
                                    ))}
                                    {stats.lowStockCount === 0 && <p className="text-success">Todo en orden.</p>}
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}

                {/* --- VISTA: PRODUCTOS --- */}
                {view === 'products' && (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="text-white">Gestión de Inventario</h2>
                            <Link to="/agregar">
                                <Button variant="warning" style={{backgroundColor: '#d4af37', fontWeight: 'bold'}}>+ Nuevo Perfume</Button>
                            </Link>
                        </div>
                        
                        <Card className="bg-dark border-0 shadow">
                            <Table hover responsive variant="dark" className="mb-0 align-middle">
                                <thead>
                                    <tr style={{color: '#d4af37'}}>
                                        <th>Img</th>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id}>
                                            <td><Image src={p.imagen} style={{width:'40px', height:'40px', objectFit:'cover', borderRadius:'5px'}} /></td>
                                            <td>
                                                <div className="fw-bold text-white">{p.nombre}</div>
                                                <small className="text-muted">{p.marca}</small>
                                            </td>
                                            <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                                            <td>
                                                <div style={{width: '100px'}}>
                                                    <div className="d-flex justify-content-between small mb-1">
                                                        <span>{p.stock || 0} u.</span>
                                                    </div>
                                                    <ProgressBar 
                                                        now={(p.stock || 0) * 5} // Escala simple visual
                                                        variant={p.stock < 5 ? 'danger' : 'success'} 
                                                        style={{height: '5px'}} 
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <Link to={`/editar/${p.id}`}><Button size="sm" variant="outline-light" className="me-2">✏️</Button></Link>
                                                <Button size="sm" variant="outline-danger" onClick={() => handleDeleteProduct(p.id)}>🗑</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                )}

                {/* --- VISTA: PEDIDOS --- */}
                {view === 'orders' && (
                    <div>
                        <h2 className="text-white mb-4">Historial de Pedidos</h2>
                        <Card className="bg-dark border-0 shadow">
                            <Table hover responsive variant="dark" className="mb-0">
                                <thead>
                                    <tr style={{color: '#d4af37'}}>
                                        <th>ID</th>
                                        <th>Fecha</th>
                                        <th>Cliente</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o.id}>
                                            <td>#{o.id}</td>
                                            <td>{new Date(o.fecha).toLocaleDateString()}</td>
                                            <td>{o.usuarioEmail}</td>
                                            <td className="text-success fw-bold">${o.total.toLocaleString('es-CL')}</td>
                                            <td><Badge bg="success">Pagado</Badge></td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && <tr><td colSpan="5" className="text-center py-4">No hay pedidos aún.</td></tr>}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                )}

            </div>
        </div>
    );
}