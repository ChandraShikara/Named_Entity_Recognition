import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import ModelInfo from "./components/ModelInfo";
import Applications from "./components/Applications";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/model-info" element={<ModelInfo />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
