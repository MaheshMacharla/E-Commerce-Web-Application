import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const cartCount = useSelector(state => state.cart.items.reduce((s, i) => s + i.quantity, 0));
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">E-Shop</Link>
          <Link to="/" className="text-sm text-gray-600">Home</Link>
          <Link to="/admin" className="text-sm text-gray-600">Admin</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/wishlist')} className="relative">
            Wishlist
            {wishlistCount > 0 && <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full px-2 text-xs">{wishlistCount}</span>}
          </button>
          <button onClick={() => navigate('/cart')} className="relative">
            Cart
            {cartCount > 0 && <span className="absolute -top-2 -right-4 bg-blue-500 text-white rounded-full px-2 text-xs">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
