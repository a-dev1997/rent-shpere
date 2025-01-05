import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userdataslice";
import getProperties from './getpropertiesslice';

const store=configureStore({
    reducer: {
        userInfo: userDataReducer,
        getproperties:getProperties
      },
})

export default store;
