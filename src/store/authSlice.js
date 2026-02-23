import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from '../api/supabaseClient';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const role = data.user.user_metadata?.role || 'visitor';
  return { user: data.user, role };
});

const initialState = {
    user: null,
    role: null,
    isAdmin: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    setSession: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.user_metadata?.role || 'visitor';
      state.isAdmin = state.role === 'admin';
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAdmin = false;
      supabase.auth.signOut();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.isAdmin = action.payload.role === 'admin';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSession, logout } = authSlice.actions;
export default authSlice.reducer;