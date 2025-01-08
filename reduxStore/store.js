import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userdataslice";
import getProperties from './getpropertiesslice';
import categorydata from './categorydataslice';
import location from './currentlocationslice';
import profiledata from './profiledataslice';
import wishlist from './wishlistslice'

const store=configureStore({
    reducer: {
      getproperties:getProperties,
        userInfo: userDataReducer,
      
        getcurrentlocation:location,
        userProfile:profiledata,
        userWishlist:wishlist,
        category:categorydata,
      },
})

export default store;
