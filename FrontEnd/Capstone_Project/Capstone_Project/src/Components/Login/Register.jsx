import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    surname: "",
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
        // NB: Correggi backend se vuole "name" invece di "nome"
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registrazione avvenuta con successo! Ora puoi accedere.");
        setFormData({ nome: "", surname: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 1500);
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
              className="rounded-4"
              type="text"
              name="nome"
              placeholder="Username..."
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="rounded-4"
              type="email"
              name="email"
              placeholder="Email..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                className="rounded-4"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password..."
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                variant="link"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                  textDecoration: "none",
                }}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? "Nascondi" : "Mostra"}
              </Button>
            </div>
          </Form.Group>
          <div className="text-center mt-4 mb-3">
            <Button variant="light" type="submit" className="w-50 rounded-4">
              Registrati
            </Button>
          </div>
          <div className="text-center mt-2">
            <a href="/login">Hai già un account?</a>
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
