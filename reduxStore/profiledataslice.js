import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios"; // Correct import

// AsyncThunk for fetching user profile data from AsyncStorage and API
export const fetchProfile = createAsyncThunk('profiledata', async () => {
    try {
        // Get the token from AsyncStorage
        const response = await AsyncStorage.getItem('user');
        if (response) {
            const user = JSON.parse(response); // Parse the user object from AsyncStorage
               
            // Fetch profile data using the token from AsyncStorage
            const profile = await Axios.get('https://rentsphere.onavinfosolutions.com/api/profile-data', {
                headers: {
                    'Authorization': `Bearer ${user.token}`, // Use the token from AsyncStorage
                },
            });

            // Log profile data (can be removed in production)
            console.log(profile.data);

            // Return the profile data in the expected shape
            return { profiledata: profile.data };
        } else {
            throw new Error("User not found in AsyncStorage");
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw error;
    }
});

// Redux slice for managing user profile data
const userProfile = createSlice({
    name: 'userProfile',
    initialState: {
        profiledata: null,  // Default state for user profile data
        profilestatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
        profileerror: null,   // Holds error message in case of failure
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                // Update status to 'loading' when the request starts
                state.profilestatus = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                // Set profiledata to the fetched data when the request succeeds
                state.profilestatus = 'succeeded';
                state.profiledata = action.payload.profiledata; // Extract profile data from the payload
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                // Set status to 'failed' and store error message when request fails
                state.profilestatus = 'failed';
                state.profileerror = action.error.message;
            });
    }
});

export default userProfile.reducer;
