import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { addToWishlist } from '../slices/wishlistSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAdd = () => dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 }));
  const handleWish = () => dispatch(addToWishlist({ id: product.id, title: product.title, price: product.price, image: product.image }));

  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold">₹{(product.price/100).toFixed(2)}</div>
          <div className="flex space-x-2">
            <button onClick={handleWish} className="px-3 py-1 border rounded text-sm">Wishlist</button>
            <button onClick={handleAdd} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Add</button>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="mt-3 inline-block text-sm text-gray-600">View</Link>
      </div>
    </div>
  );
}
