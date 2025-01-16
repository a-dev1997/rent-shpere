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
export const fetchProfile = createAsyncThunk('profiledata', async () => {
  try {
      // Get the token from AsyncStorage
      const response = await AsyncStorage.getItem('user');
      if (response) {
          const user = JSON.parse(response); // Parse the user object from AsyncStorage
             
          // Fetch profile data using the token from AsyncStorage
          const profile = await axios.get('https://rentsphere.onavinfosolutions.com/api/profile-data', {
              headers: {
                  'Authorization': `Bearer ${user.token}`, // Use the token from AsyncStorage
              },
          });

          // Log profile data (can be removed in production)
         

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

const myProfile = createSlice({
  name: 'userProfile',
  initialState: {
    profiledata: null, // Initialize with an empty array for paginated results
    profilestatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
    profileerror: null,
    // currentPage: 1, // Track the current page
    // hasMore: true, // Flag to determine if more data is available
    // lastPage:1
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profilestatus = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.mypropstatus = 'succeeded';
        // Append the new data to the existing data
        state.profiledata =action.payload.data;
       
        
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profilestatus = 'failed';
        state.profileerror = action.error.message;
      });
  },
});

export default myProfile.reducer;


