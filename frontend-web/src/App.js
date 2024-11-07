import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        {/* more routes as neede */}
      </Routes>
    </Router>
  );
}

export default App;
