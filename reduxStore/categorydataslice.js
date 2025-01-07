import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "./store";

export const fetchCatData=createAsyncThunk('catdata',async()=>{
 let c=   store.getState()

 let response= await fetch('https://rentsphere.onavinfosolutions.com/api/property-category');

 return await response.json()
})

const catData=createSlice({
    name:'category',
    initialState:{
        catData:null,
        catStatus:'idel',
        error:null
    },

    extraReducers:(builder)=>{
            builder.addCase(fetchCatData.pending,(state)=>{
                state.catStatus='loading'
            }).addCase(fetchCatData.fulfilled,(state,action)=>{
                state.catStatus='succeeded'
                state.catData= action.payload
            }).addCase(fetchCatData.rejected,(state,action)=>{
                state.status = 'failed';
                state.error = action.error.message;
            })

    }
})

export default catData.reducer;