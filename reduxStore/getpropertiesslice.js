import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

import axios from "axios";

       // AsyncThunk for fetching user data from AsyncStorage
export const fetchProperties = createAsyncThunk('getproperties', async () => {
    const response = await axios.get('https://rentsphere.onavinfosolutions.com/api/properties') ;
   
    return response.data; // Parse the JSON string into an object
  });

  const userData=createSlice({
    name:'getproperties',
    initialState:{
        propdata: null, // Default state for user data
        propstatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
        properror: null,
      },

    extraReducers: (builder) => {
        builder
          .addCase(fetchProperties.pending, (state) => {
            state.propstatus = 'loading';
          })
          .addCase(fetchProperties.fulfilled, (state, action) => {
            state.propstatus = 'succeeded';
            state.propdata = action.payload; // Save fetched data to the state
          })
          .addCase(fetchProperties.rejected, (state, action) => {
            state.propstatus = 'failed';
            state.properror = action.error.message;
          });
      },
     
     
     
})
export default userData.reducer;


