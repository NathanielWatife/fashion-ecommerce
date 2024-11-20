import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';  // Rename to ProductDetail for clarity
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from "./pages/CheckOut";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* Updated to ProductDetail */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        
      </Routes>
    </Router>
  );
}

export default App;
