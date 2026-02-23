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
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

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

export default productSlice.reducer;