import { useState } from 'react';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import CartSidebar from './CartSidebar';
import AuthModal from './AuthModal';

function NavBar(){
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showCart, setShowCart] = useState(false);
    const [showLogin, setShowLogin] = useState(false); 

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const goldColor = '#d4af37';
    const darkBg = '#0a0a0a';
    const linkStyle = { color: '#ffffff', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.3s ease' };
    const handleMouseEnter = (e) => e.target.style.color = goldColor;
    const handleMouseLeave = (e) => e.target.style.color = '#ffffff';

    return (
        <>
            <Navbar 
                expand="md" 
                fixed="top"
                className="shadow-lg py-3" 
                style={{ backgroundColor: darkBg, borderBottom: `2px solid ${goldColor}` }}
            >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: '900', fontSize: '1.8rem', letterSpacing: '2px', background: `linear-gradient(to right, #bf953f, ${goldColor}, #b38728, ${goldColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase' }}>
                        PERFULANDIA
                    </div>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="navbar-nav" style={{ borderColor: goldColor, color: goldColor }}>
                    <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                </Navbar.Toggle>
                
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto ms-4">
                        {['Inicio', 'Productos', 'Contacto'].map((text, index) => {
                            const path = text === 'Inicio' ? '/' : `/${text.toLowerCase()}`;
                            return (
                                <Nav.Link key={index} as={Link} to={path} style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    {text}
                                </Nav.Link>
                            );
                        })}
                    </Nav>

                    <Nav className="align-items-center gap-3">
                        {user && user.role === 'admin' && (
                            <Link to="/admin" className="text-decoration-none">
                                <Badge style={{ backgroundColor: 'transparent', border: `1px solid ${goldColor}`, color: goldColor, cursor: 'pointer', borderRadius: '20px', padding: '5px 10px' }}>⚙️ Panel Admin</Badge>
                            </Link>
                        )}

                        <Nav.Link onClick={() => setShowCart(true)} style={{ cursor: 'pointer', position: 'relative' }}>
                            <span style={{ fontSize: '1.2rem' }}>🛒</span>
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: goldColor, color: 'black', borderRadius: '50%', width: '20px', height: '20px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{cartCount}</span>
                            )}
                        </Nav.Link>

                        <div style={{ height: '25px', width: '1px', backgroundColor: goldColor, opacity: 0.5 }}></div>

                        {user ? (
                            <div className="d-flex align-items-center gap-2">
                                <span style={{ color: goldColor, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {user.email.split('@')[0].toUpperCase()}
                                </span>
                                <Link to="/mis-compras" className="text-decoration-none">
                                    <Badge bg="secondary" style={{ cursor: 'pointer', borderRadius: '20px', fontSize: '0.7rem' }}>📦 Pedidos</Badge>
                                </Link>
                                <Button variant="outline-light" size="sm" onClick={handleLogout} style={{ borderRadius: '20px', fontSize: '0.75rem', borderColor: '#555', color: '#ccc' }}>Salir</Button>
                            </div>
                        ) : (
                            <Button 
                                onClick={() => setShowLogin(true)} 
                                size="sm" 
                                style={{ backgroundColor: goldColor, borderColor: goldColor, color: 'black', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', padding: '5px 15px' }}
                            >
                                INGRESAR
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>

            <div style={{ height: '80px' }}></div>

            <CartSidebar show={showCart} handleClose={() => setShowCart(false)} />
            <AuthModal show={showLogin} handleClose={() => setShowLogin(false)} />
        </>
    );
}

export default NavBar;