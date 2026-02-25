import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../api/supabaseClient';

export const placeOrder = createAsyncThunk(
  'order/place',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from('orders').insert(orderData).select().single();

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

export const fetchOrders = createAsyncThunk('order/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from('orders').select('*');

    if (error) {
      console.error('Supabase Error:', error.message);
      return rejectWithValue(error.message);
    }
    console.log('Orders fetched from DB:', data);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const updateOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async ({ orderId, newStatus }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Supabase Error:', error.message);
        return rejectWithValue(error.message);
      }
      console.log(`Order ${orderId} status updated to ${newStatus} in DB:`, data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  currentOrder: null,
  loading: false,
  error: null,
  allOrders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.allOrders.findIndex((order) => order.id === updatedOrder.id);
        if (index !== -1) {
          state.allOrders[index] = updatedOrder;
        }
      });
  },
});

export default orderSlice.reducer;
