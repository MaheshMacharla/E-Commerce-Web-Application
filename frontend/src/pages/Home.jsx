import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4242/api/products').then(res => setProducts(res.data)).catch(console.error);
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filtered = products.filter(p => {
    if (cat && p.category !== cat) return false;
    if (q && !(p.title.toLowerCase().includes(q.toLowerCase()) || (p.description||'').toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <FilterBar categories={categories} selected={cat} onSelect={setCat} onSearch={setQ} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
