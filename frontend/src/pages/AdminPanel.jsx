import React, { useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', image: ''});
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {...form, price: Number(form.price) };
      const res = await axios.post('http://localhost:4242/api/products', payload);
      setMsg('Product added: ' + res.data.title);
      setForm({ title: '', description: '', price: '', category: '', image: ''});
    } catch (err) {
      console.error(err);
      setMsg('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Admin — Add Product</h1>
      {msg && <div className="mb-3 text-sm">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input required value={form.title} onChange={e=> setForm({...form, title: e.target.value})} placeholder="Title" className="w-full border px-3 py-2 rounded"/>
        <input value={form.description} onChange={e=> setForm({...form, description: e.target.value})} placeholder="Description" className="w-full border px-3 py-2 rounded"/>
        <input required value={form.price} onChange={e=> setForm({...form, price: e.target.value})} placeholder="Price in paise (e.g., 1999 for ₹19.99)" className="w-full border px-3 py-2 rounded"/>
        <input value={form.category} onChange={e=> setForm({...form, category: e.target.value})} placeholder="Category" className="w-full border px-3 py-2 rounded"/>
        <input value={form.image} onChange={e=> setForm({...form, image: e.target.value})} placeholder="Image URL" className="w-full border px-3 py-2 rounded"/>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Add Product</button>
        </div>
      </form>
    </div>
  );
}
