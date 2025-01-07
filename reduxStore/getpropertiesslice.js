import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk for fetching properties with pagination
export const fetchProperties = createAsyncThunk(
  'getproperties/fetchProperties',
  async (page) => {
    // Fetch data for the requested page
    const response = await axios.get(`https://rentsphere.onavinfosolutions.com/api/properties/?page=${page}`);
    return {
      data: response.data.data, // Assuming `response.data.data` contains the array of properties
      currentPage: response.data.current_page,
      lastPage: response.data.last_page,
    };
  }
);

const userData = createSlice({
  name: 'getproperties',
  initialState: {
    propdata: [], // Initialize with an empty array for paginated results
    propstatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
    properror: null,
    currentPage: 1, // Track the current page
    hasMore: true, // Flag to determine if more data is available
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.propstatus = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.propstatus = 'succeeded';
        // Append the new data to the existing data
        state.propdata = [...state.propdata,...action.payload.data];
        // Update the current page and determine if there are more pages
        state.currentPage = action.payload.currentPage;
        state.hasMore = action.payload.currentPage < action.payload.lastPage;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.propstatus = 'failed';
        state.properror = action.error.message;
      });
  },
});

export default userData.reducer;


