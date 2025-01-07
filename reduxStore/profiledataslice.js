
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

       // AsyncThunk for fetching user data from AsyncStorage
export const fetchUserData = createAsyncThunk('userInfo/statesData', async () => {
    const response = await AsyncStorage.getItem('user');
    return JSON.parse(response); // Parse the JSON string into an object
  });

  const userData=createSlice({
    name:'userInfo',
    initialState:{
        data: null, // Default state for user data
        status: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
        error: null,
      },

    extraReducers: (builder) => {
        builder
          .addCase(fetchUserData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchUserData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload; // Save fetched data to the state
          })
          .addCase(fetchUserData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      },
     
     
     
})
export default userData.reducer;


