import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
      <footer className="bg-white shadow-inner py-4">
        <div className="container mx-auto text-center text-sm text-gray-500">© {new Date().getFullYear()} E-Shop Demo</div>
      </footer>
    </div>
  );
}
