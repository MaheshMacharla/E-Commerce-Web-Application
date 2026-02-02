import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { addToWishlist } from '../slices/wishlistSlice';

export default function Product() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:4242/api/products`).then(res => {
      const p = res.data.find(x => x.id === id);
      setProd(p);
    })
  }, [id]);

  if (!prod) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded p-6 flex flex-col md:flex-row gap-6">
      <img src={prod.image} className="w-full md:w-1/2 h-64 object-cover rounded" alt={prod.title} />
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{prod.title}</h2>
        <p className="text-gray-600 mt-2">{prod.description}</p>
        <div className="mt-4 text-xl font-bold">₹{(prod.price/100).toFixed(2)}</div>

        <div className="mt-4 flex items-center gap-3">
          <input type="number" min={1} value={qty} onChange={e => setQty(Number(e.target.value))} className="w-20 border rounded px-2 py-1"/>
          <button onClick={() => dispatch(addToCart({ id: prod.id, title: prod.title, price: prod.price, image: prod.image, quantity: qty }))} className="px-4 py-2 bg-blue-600 text-white rounded">Add to cart</button>
          <button onClick={() => dispatch(addToWishlist({ id: prod.id, title: prod.title, price: prod.price, image: prod.image }))} className="px-4 py-2 border rounded">Wishlist</button>
        </div>
      </div>
    </div>
  );
}
