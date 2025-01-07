import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userdataslice";
import getProperties from './getpropertiesslice';
import categorydata from './categorydataslice';
import location from './currentlocationslice';
import profiledata from './profiledataslice';
import wishlist from './wishlistslice'

const store=configureStore({
    reducer: {
        userInfo: userDataReducer,
        getproperties:getProperties,
        category:categorydata,
        getcurrentlocation:location,
        userProfile:profiledata,
        userWishlist:wishlist
      },
})

export default store;
