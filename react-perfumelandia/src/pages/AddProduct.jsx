import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const { token } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombre: '', marca: '', precio: '', imagen: '', category: 'Hombre', aroma: 'Dulce', stock: ''
    });
    
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/perfume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Perfume agregado exitosamente');
                navigate('/productos');
            } else {
                setError('Error al crear el perfume.');
            }
        } catch (err) {
            setError('Error de conexión');
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <h2>Agregar Nuevo Perfume</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre del Perfume</Form.Label>
                    <Form.Control required name="nombre" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control required name="marca" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" required name="precio" onChange={handleChange} />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Stock Inicial</Form.Label>
                    <Form.Control type="number" required name="stock" placeholder="Ej: 10" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control required name="imagen" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Género</Form.Label>
                    <Form.Select name="category" onChange={handleChange}>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                        <option value="Unisex">Unisex</option>
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Aroma</Form.Label>
                    <Form.Select name="aroma" onChange={handleChange}>
                        <option value="Dulce">Dulce</option>
                        <option value="Cítrico">Cítrico</option>
                        <option value="Floral">Floral</option>
                        <option value="Amaderado">Amaderado</option>
                        <option value="Tropical">Tropical</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="success" type="submit">Guardar Perfume</Button>
            </Form>
        </Container>
    );
}