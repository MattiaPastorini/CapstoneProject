import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // TODO: chiamata al backend
    console.log("Registrazione:", formData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card
        className="bg-dark text-white p-4 w-100"
        style={{ maxWidth: "400px" }}
      >
        <h4 className="text-center mb-4">Registrati</h4>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              placeholder="Inserisci il tuo nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Inserisci la tua email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Crea una password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="light" type="submit" className="w-100">
            Registrati
          </Button>
          <div className="text-center mt-2">
            <a href="login">Hai già un account?</a>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
