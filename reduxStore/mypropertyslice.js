import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncThunk for fetching properties with pagination
// export const fetchMyProperties = createAsyncThunk(
//   'getproperties/fetchProperties',
//   async () => {
//     // Fetch data for the requested page
//     const response = await axios.get(`https://rentsphere.onavinfosolutions.com/api/my-properties`);

//     return {
//       data: response.data, // Assuming `response.data.data` contains the array of properties
//     //   currentPage: response.data.current_page,
//     //   lastPage: response.data.last_page,
//     };
//   }
// );

// AsyncThunk for fetching user profile data from AsyncStorage and API
export const fetchMyProperties = createAsyncThunk('profiledata', async () => {
  try {
      // Get the token from AsyncStorage
      const response = await AsyncStorage.getItem('user');
      if (response) {
          const user = JSON.parse(response); // Parse the user object from AsyncStorage
             
          // Fetch profile data using the token from AsyncStorage
          const profile = await axios.get('https://rentsphere.onavinfosolutions.com/api/my-properties', {
              headers: {
                  'Authorization': `Bearer ${user.token}`, // Use the token from AsyncStorage
              },
          });

          // Log profile data (can be removed in production)
          console.log('kjkjkjkjk'+profile.data);

          // Return the profile data in the expected shape
          return { data: profile.data };
      } else {
          throw new Error("User not found in AsyncStorage");
      }
  } catch (error) {
      console.error("Error fetching profile data:", error);
      throw error;
  }
});

const myproperties = createSlice({
  name: 'getmyproperties',
  initialState: {
    mypropdata: null, // Initialize with an empty array for paginated results
    mypropstatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
    myproperror: null,
    // currentPage: 1, // Track the current page
    // hasMore: true, // Flag to determine if more data is available
    // lastPage:1
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProperties.pending, (state) => {
        state.mypropstatus = 'loading';
      })
      .addCase(fetchMyProperties.fulfilled, (state, action) => {
        state.mypropstatus = 'succeeded';
        // Append the new data to the existing data
        state.mypropdata =action.payload.data;
       
        
      })
      .addCase(fetchMyProperties.rejected, (state, action) => {
        state.mypropstatus = 'failed';
        state.myproperror = action.error.message;
      });
  },
});

export default myproperties.reducer;


