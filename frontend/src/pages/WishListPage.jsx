import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../slices/wishlistSlice';
import { addToCart } from '../slices/cartSlice';

export default function WishlistPage() {
  const items = useSelector(s => s.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {items.length === 0 ? <div>No items in wishlist.</div> :
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(it => (
            <div key={it.id} className="bg-white rounded shadow p-3">
              <img src={it.image} alt={it.title} className="w-full h-40 object-cover rounded"/>
              <div className="mt-2 font-semibold">{it.title}</div>
              <div className="mt-2 flex justify-between">
                <button onClick={() => dispatch(addToCart({ id: it.id, title: it.title, price: it.price, image: it.image, quantity:1 }))} className="px-3 py-1 bg-blue-600 text-white rounded">Add to cart</button>
                <button onClick={() => dispatch(removeFromWishlist(it.id))} className="px-3 py-1 border rounded">Remove</button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
