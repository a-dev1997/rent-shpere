import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userdataslice";
import getProperties from './getpropertiesslice';
import categorydata from './categorydataslice';
import location from './currentlocationslice';
import profiledata from './profiledataslice';
import wishlist from './wishlistslice'
import states from './getstatesslice'
import myproperties from './mypropertyslice'
import mymessages from './messageslice'
const store=configureStore({
    reducer: {
      getproperties:getProperties,
        userInfo: userDataReducer,
        getcurrentlocation:location,
        userProfile:profiledata,
        userWishlist:wishlist,
        category:categorydata,
        statesData:states,
        getmyproperties:myproperties,
        messages:mymessages
      },
})

export default store;
