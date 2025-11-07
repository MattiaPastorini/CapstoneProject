import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import NavBar from "./Components/NavBar";
import Regolamento from "./Components/Regolamento";
import NewsPage from "./Components/News/NewsPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Classifica from "./Components/Classifiche/Classifica";
import ProtectedRoute from "./Components/Protection/ProtectedRoute";
import Team from "./Components/Team/Team";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/classifiche" element={<Classifica />} />
            <Route
              path="/team"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Team />
                </ProtectedRoute>
              }
            />
            <Route path="/regolamento" element={<Regolamento />} />
            <Route path="/news" element={<NewsPage />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/register"
              element={<Register setIsAuthenticated={setIsAuthenticated} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
