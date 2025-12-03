import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onAdd, onReload }) {
    const { user, token } = useAuth();

    // Verificamos si hay stock (Si es null/undefined asumimos que hay para no romper nada)
    const stock = product.stock !== undefined && product.stock !== null ? product.stock : 0;
    const hasStock = stock > 0;

    const handleDelete = async () => {
        if(!window.confirm("¿Estás seguro de eliminar este perfume?")) return;

        try {
            const id = product.id || product._id;
            const response = await fetch(`http://localhost:8080/perfume/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                alert("Eliminado con éxito");
                if(onReload) onReload();
            } else {
                alert("No tienes permiso o hubo un error");
            }
        } catch (e) { console.error(e); }
    };

    return (
        <Card className={`h-100 ${styles.productCard}`} style={{
            backgroundColor: '#ffffff',
            border: '1px solid #eaeaea',
            color: '#000000',
            opacity: hasStock ? 1 : 0.6 // Opacidad reducida si no hay stock
        }}>
            <div style={{ padding: '15px', borderRadius: '5px 5px 0 0', textAlign: 'center', position: 'relative' }}>
                
                {/* Etiqueta flotante de AGOTADO */}
                {!hasStock && (
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        backgroundColor: '#000', color: '#d4af37', padding: '5px 15px',
                        fontWeight: 'bold', borderRadius: '5px', zIndex: 10, border: '1px solid #d4af37'
                    }}>
                        AGOTADO
                    </div>
                )}

                <Card.Img 
                    variant="top" 
                    src={product.imagen || product.image || "https://placehold.co/400x300?text=Perfume"} 
                    className={styles.cardImage}
                    style={{ 
                        objectFit: 'contain', 
                        height: '200px',
                        filter: hasStock ? 'none' : 'grayscale(100%)' // Blanco y negro si no hay stock
                    }}
                />
            </div>
            
            <Card.Body className="d-flex flex-column p-3">
                <Card.Title className={styles.productName} style={{ color: '#000', fontWeight: '700', fontSize: '1.1rem' }}>
                    {product.nombre || product.name}
                </Card.Title>
                
                <div className="mb-2 text-muted small">
                    {product.marca}
                </div>

                <div className={styles.priceContainer}>
                    <span className={styles.currentPrice} style={{ color: '#d4af37', fontSize: '1.3rem', fontWeight: 'bold' }}>
                        ${Number(product.precio || product.price).toLocaleString('es-CL')}
                    </span>
                </div>

                {/* --- NUEVO: MOSTRAR STOCK DEBAJO DEL PRECIO --- */}
                <div className="mb-3" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    {hasStock ? (
                        <span style={{ color: stock < 5 ? '#dc3545' : '#198754' }}> {/* Rojo si hay menos de 5, Verde si hay más */}
                            📦 Stock: {stock} u.
                        </span>
                    ) : (
                        <span className="text-muted">
                            🚫 Sin unidades
                        </span>
                    )}
                </div>

                <div className="mt-auto d-flex gap-2 pt-1">
                    <Button 
                        onClick={() => hasStock && onAdd(product)}
                        className="flex-grow-1"
                        disabled={!hasStock} // Bloquea el botón
                        style={{ 
                            backgroundColor: hasStock ? '#d4af37' : '#e0e0e0', 
                            borderColor: hasStock ? '#d4af37' : '#e0e0e0', 
                            color: hasStock ? '#000' : '#888', 
                            fontWeight: 'bold',
                            borderRadius: '20px',
                            cursor: hasStock ? 'pointer' : 'not-allowed'
                        }}
                    >
                        {hasStock ? 'Añadir' : 'Sin Stock'}
                    </Button>

                    {user && user.role === 'admin' && (
                        <Button 
                            variant="outline-danger" 
                            onClick={handleDelete}
                            style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}
                        >
                            🗑
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}