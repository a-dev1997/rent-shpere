import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Remove axios and store import
// import axios from "axios"; // We can directly use fetch or axios if needed

// Define the async thunk to fetch data
export const fetchStates = createAsyncThunk('states', async () => {
  // Fetch the data directly
  const response = await fetch('https://rentsphere.onavinfosolutions.com/api/states');
  const data = await response.json();
  console.log('category form slice'+ data)
  return data;
});

// Define the slice
const statesDataSlice = createSlice({
  name: 'category',
  initialState: {
    statesData: null,
    statesStatus: 'idle', // typo fixed: 'idel' -> 'idle'
    stateserror: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStates.pending, (state) => {
        state.statesStatus = 'loading';
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.statesStatus = 'succeeded';
        state.statesData = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.statesStatus = 'failed';
        state.stateserror = action.error.message;
      });
  },
});

export default statesDataSlice.reducer;
