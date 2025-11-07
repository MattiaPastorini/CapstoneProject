import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.text();

      if (result === "ok") {
        setMessage("Login riuscito!");
        setIsAuthenticated(true);
        navigate("/team");
      } else {
        setMessage("Email o password errati.");
      }
    } catch (error) {
      setMessage("Errore di connessione al server.", error);
    }
  };

  return (
    <Container className=" d-flex justify-content-center align-items-center mt-5 mb-4">
      <Card
        className="bg-dark text-white px-5 pt-4 pb-3 w-100 rounded-5"
        style={{ maxWidth: "450px" }}
      >
        <h4 className="text-center mb-3">Accedi</h4>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email/Username</Form.Label>
            <Form.Control
              className=" rounded-4"
              type="text"
              placeholder="Email/Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                className="rounded-4"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className=" text-center ">
            <Button variant="light" type="submit" className="w-50 rounded-4">
              Accedi
            </Button>
          </div>
          <div className="text-center mt-2 ">
            <a href="/register">Non sei ancora registrato?</a>
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

export default Login;
