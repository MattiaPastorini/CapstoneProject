import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: chiamata al backend
    console.log("Login:", { email, password });
  };

  return (
    <Container className=" d-flex justify-content-center align-items-center my-5">
      <Card
        className="bg-dark text-white px-5 pt-4 pb-3 w-100 rounded-5"
        style={{ maxWidth: "450px" }}
      >
        <h4 className="text-center mb-3">Accedi</h4>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className=" rounded-4"
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className=" rounded-4"
              type="password"
              placeholder="Inserisci la tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
      </Card>
    </Container>
  );
}

export default Login;
