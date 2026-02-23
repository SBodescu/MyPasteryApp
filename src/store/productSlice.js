import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { supabase } from '../api/supabaseClient';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error("Supabase Error:", error.message);
      return rejectWithValue(error.message);
    }

    console.log("Date primite din DB:", data);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = {
    items: [],
    cart: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cart = state.cart.filter(item => item.id !== id);
        },
            clearCart: (state) => {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { addToCart, removeFromCart, clearCart } = productSlice.actions;
export default productSlice.reducer;