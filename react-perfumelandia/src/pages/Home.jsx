import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            <Container className={styles.heroSection}>
                {/* === BANNERS (PARTE DE ARRIBA) === */}
                <Row>
                    {/* Banner Grande Izquierdo */}
                    <Col lg={8}>
                        <div className={styles.mainBanner}>
                            <span className={styles.tagline}>COLECCIÓN EXCLUSIVA</span>
                            <h2 className={styles.titleLarge}>
                                Esencia <br /> Chanel N°5
                            </h2>
                            <p style={{ color: '#ccc', maxWidth: '50%' }}>
                                La elegancia atemporal en una fragancia que define tu personalidad.
                            </p>
                            
                            <Link to="/productos">
                                <button className={styles.btnPrimary} style={{ backgroundColor: '#d4af37', color: 'black' }}>
                                    Ver Colección
                                </button>
                            </Link>

                            <img 
                                src="https://www.chanel.com/images/w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1920/n-5-l-eau-eau-de-toilette-spray-3-4fl-oz--packshot-default-105530-9564904980510.jpg" 
                                alt="Perfume Principal" 
                                className={styles.mainBannerImg} 
                            />
                        </div>
                    </Col>

                    {/* Banners Pequeños Derecha */}
                    <Col lg={4}>
                        <div className={styles.sideBannerTop}>
                            <h3 className={styles.titleSmall}>Versace Eros</h3>
                            <p className="small" style={{ color: 'white' }}>Oferta Lanzamiento -20%</p>
                            <Link to="/productos" className={styles.linkText} style={{ color: '#d4af37' }}>Ver detalles →</Link>
                            
                            <img 
                                src="https://pngimg.com/d/perfume_PNG10286.png" 
                                alt="Perfume Azul" 
                                className={styles.sideBannerImg} 
                            />
                        </div>

                        <div className={styles.sideBannerBottom}>
                            <h3 className={styles.titleSmall}>Dior Sauvage</h3>
                            <p className="small" style={{ color: 'white' }}>El favorito de ellos</p>
                            <Link to="/productos" className={styles.linkText} style={{ color: '#d4af37' }}>Comprar →</Link>

                            <img 
                                src="https://eternoperfumes.com/cdn/shop/files/sauvagedecant.png?v=1754633333" 
                                alt="Perfume Dorado" 
                                className={styles.sideBannerImg} 
                            />
                        </div>
                    </Col>
                </Row> 
                <div className={styles.goldDivider}></div>
                {/* === BARRA DE SERVICIOS*/}
                <Row className={styles.servicesBar}>
                    <Col md={3} className={styles.serviceItem}>
                        <div className={styles.iconBox}>🚚</div>
                        <div>
                            <h6 className="mb-0 fw-bold">Envío Gratis</h6>
                            <small className="text-muted">Todo Chile sobre $50.000</small>
                        </div>
                    </Col>
                    <Col md={3} className={styles.serviceItem}>
                        <div className={styles.iconBox}>💎</div>
                        <div>
                            <h6 className="mb-0 fw-bold">100% Originales</h6>
                            <small className="text-muted">Garantía de autenticidad</small>
                        </div>
                    </Col>
                    <Col md={3} className={styles.serviceItem}>
                        <div className={styles.iconBox}>💳</div>
                        <div>
                            <h6 className="mb-0 fw-bold">Pago Seguro</h6>
                            <small className="text-muted">WebPay / 6 Cuotas sin interés</small>
                        </div>
                    </Col>
                    <Col md={3} className={styles.serviceItem}>
                        <div className={styles.iconBox}>📍</div>
                        <div>
                            <h6 className="mb-0 fw-bold">Retiro en Tienda</h6>
                            <small className="text-muted">Disponible en 24hrs</small>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/*FOOTER*/}
            <footer className={styles.footer}>
                <Container>
                    <Row>
                        {/*Marca*/}
                        <Col md={4} className="mb-4">
                            <h4 style={{ 
                                fontFamily: "'Playfair Display', serif", 
                                color: '#d4af37', 
                                fontWeight: '900', 
                                letterSpacing: '2px' 
                            }}>
                                PERFULANDIA
                            </h4>
                            <p className="text-muted mt-3">
                                Descubre el lujo de las mejores fragancias del mundo. 
                                Calidad, elegancia y distinción en cada gota.
                            </p>
                            <div className="mt-3">
                                <span className={styles.socialIcon}>📷</span>
                                <span className={styles.socialIcon}>📘</span>
                                <span className={styles.socialIcon}>🎵</span>
                            </div>
                        </Col>

                        {/*Contacto */}
                        <Col md={4} className="mb-4">
                            <h5 className={styles.footerTitle}>Contáctanos</h5>
                            <span className={styles.footerText}>📞 +56 2 2999 8877</span>
                            <span className={styles.footerText}>✉️ contacto@perfulandia.cl</span>
                            <span className={styles.footerText}>🕒 Lun-Vie: 10:00 - 20:00</span>
                        </Col>

                        {/*Tiendas y Pagos */}
                        <Col md={4} className="mb-4">
                            <h5 className={styles.footerTitle}>Nuestras Tiendas</h5>
                            <span className={styles.footerText}>📍 Mall Costanera Center, Piso 2</span>
                            <span className={styles.footerText}>📍 Parque Arauco, Local 104</span>
                            
                            <h5 className={styles.footerTitle + " mt-4"}>Medios de Pago</h5>
                            <div className="d-flex gap-2">
                                <span style={{fontSize: '2rem'}}>💳</span>
                                <span style={{fontSize: '2rem'}}>🏦</span>
                                <span style={{fontSize: '2rem'}}>💵</span>
                            </div>
                        </Col>
                    </Row>
                    
                    {/* Copyright */}
                    <div className="text-center mt-4 pt-3 border-top border-secondary">
                        <small className="text-muted">
                            © 2025 Perfulandia Chile. Todos los derechos reservados.
                        </small>
                    </div>
                </Container>
            </footer>
        </div>
    );
}