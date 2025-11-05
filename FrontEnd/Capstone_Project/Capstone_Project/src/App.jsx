import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./Components/NavBar";
import Regolamento from "./Components/Regolamento";
import NewsPage from "./Components/News/NewsPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Classifica from "./Classifiche/Classifica";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/classifiche" element={<Classifica />} />
            <Route path="/regolamento" element={<Regolamento />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
