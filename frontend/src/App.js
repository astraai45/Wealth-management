import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./Navbar";
import Home from "./Home";
import Maps from "./Maps";
import Chat from "./Chat";
import Predictor from "./Predictor";
function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/predict" element={<Predictor />} />
      </Routes>
    </Router>
  );
}

export default App;
