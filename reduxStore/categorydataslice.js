import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Remove axios and store import
// import axios from "axios"; // We can directly use fetch or axios if needed

// Define the async thunk to fetch data
export const fetchCatData = createAsyncThunk('category/fetchCatData', async () => {
  // Fetch the data directly
  const response = await fetch('https://rentsphere.onavinfosolutions.com/api/property-category');
  const data = await response.json();
  return data;
});

// Define the slice
const catDataSlice = createSlice({
  name: 'category',
  initialState: {
    catData: null,
    catStatus: 'idle', // typo fixed: 'idel' -> 'idle'
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatData.pending, (state) => {
        state.catStatus = 'loading';
      })
      .addCase(fetchCatData.fulfilled, (state, action) => {
        state.catStatus = 'succeeded';
        state.catData = action.payload;
      })
      .addCase(fetchCatData.rejected, (state, action) => {
        state.catStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default catDataSlice.reducer;
