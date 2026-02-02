import React from 'react';

export default function FilterBar({ categories, selected, onSelect, onSearch }) {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-center space-x-2">
        <select value={selected} onChange={(e)=> onSelect(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">All Categories</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <input onChange={(e)=> onSearch(e.target.value)} placeholder="Search products..." className="border rounded px-3 py-1"/>
      </div>
    </div>
  );
}
