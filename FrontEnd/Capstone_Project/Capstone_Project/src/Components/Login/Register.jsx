import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // Stato per feedback utente

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registrazione avvenuta con successo! Ora puoi accedere.");
        setFormData({ username: "", email: "", password: "" }); // reset campi
        setTimeout(() => navigate("/login"), 1500); // Redirect dopo 1.5 sec
      } else {
        setMessage(
          "Registrazione fallita. Email già registrata o dati errati."
        );
      }
    } catch (error) {
      setMessage("Errore di connessione al server.", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card
        className="bg-dark text-white px-5 pt-4 pb-3 w-100 rounded-5"
        style={{ maxWidth: "400px" }}
      >
        <h4 className="text-center mb-3">Registrati</h4>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className=" rounded-4"
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
              className=" rounded-4"
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
              className=" rounded-4"
              type="password"
              name="password"
              placeholder="Crea una password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className=" text-center mt-4 mb-3">
            <Button variant="light" type="submit" className="w-50 rounded-4">
              Registrati
            </Button>
          </div>
          <div className="text-center mt-2">
            <a href="login">Hai già un account?</a>
          </div>
        </Form>
        {message && (
          <div className="mt-3 text-center">
            <span>{message}</span>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default Register;
