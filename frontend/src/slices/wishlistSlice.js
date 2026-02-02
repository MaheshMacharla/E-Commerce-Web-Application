import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [] // same minimal structure
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const item = action.payload;
      if (!state.items.find(i => i.id === item.id)) state.items.push(item);
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
