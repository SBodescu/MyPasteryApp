import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../api/supabaseClient';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('Supabase Error:', error.message);
        return rejectWithValue(error.message);
      }

      console.log('Date primite din DB:', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addProductToCatalogue = createAsyncThunk(
  'products/addToCatalogue',
  async (product, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from('products').insert([product]).select();

      if (error) {
        console.error('Supabase Error:', error.message);
        return rejectWithValue(error.message);
      }
      console.log('Produs adăugat în DB:', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProductInCatalogue = createAsyncThunk(
  'products/updateProductInCatalogue',
  async (product, { rejectWithValue }) => {
    if (!product.id) {
      throw new Error('ID-ul produsului lipsește din datele de update!');
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          image_url: product.image_url,
        })
        .eq('id', product.id)
        .select();

      if (error) {
        console.error('Supabase Error:', error.message);
        return rejectWithValue(error.message);
      }
      console.log('Produs actualizat în DB:', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const restoreProudctInCatalogue = createAsyncThunk(
  'products/restoreProductInCatalogue',
  async (product, { rejectWithValue }) => {
    if (!product.id) {
      throw new Error('ID-ul produsului lipsește din datele de restore!');
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ isDeleted: false })
        .eq('id', product.id)
        .select();

      if (error) {
        console.error('Supabase Error:', error.message);
        return rejectWithValue(error.message);
      }
      console.log('Produs restaurat în DB:', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProductFromCatalogue = createAsyncThunk(
  'products/deleteProductFromCatalogue',
  async (product, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ isDeleted: true })
        .eq('id', product.id)
        .select();

      if (error) {
        console.error('Supabase Error:', error.message);
        return rejectWithValue(error.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
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
      })
      .addCase(addProductToCatalogue.fulfilled, (state, action) => {
        state.items.push(action.payload[0]);
      })
      .addCase(updateProductInCatalogue.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload[0].id);
        if (index !== -1) {
          state.items[index] = action.payload[0];
        }
      })
      .addCase(deleteProductFromCatalogue.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload[0].id);
      })
      .addCase(restoreProudctInCatalogue.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload[0].id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], isDeleted: false };
        }
      });
  },
});
export const { addToCart, removeFromCart, clearCart } = productSlice.actions;
export default productSlice.reducer;
