import GetLocation from "react-native-get-location";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk for fetching user location and weather data
export const fetchCurrentlocation = createAsyncThunk(
  'getlocation', 
  async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      
      const { latitude, longitude } = location;

      // Fetch weather data based on location
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=193c7f6157929f624b350a72abbecf85`
      );

      // Return the weather data
      return {
        location: weatherResponse.data.name, // Get location name
        // weather: weatherResponse.data.weather,
      };
    } catch (error) {
      console.error('Error fetching location or weather:', error);
      throw error;
    }
  }
);

// Redux slice for user data
const locationData = createSlice({
  name: 'getcurrentlocation',
  initialState: {
    locationdata: null, // Default state for user data
    locationstatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
    locationerror: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentlocation.pending, (state) => {
        state.locationstatus = 'loading';
      })
      .addCase(fetchCurrentlocation.fulfilled, (state, action) => {
        state.locationstatus = 'succeeded';
        state.locationdata = action.payload; // Save fetched data to the state
      })
      .addCase(fetchCurrentlocation.rejected, (state, action) => {
        state.locationstatus = 'failed';
        state.locationerror = action.error.message; // Handle error message
      });
  }
});

export default locationData.reducer;
