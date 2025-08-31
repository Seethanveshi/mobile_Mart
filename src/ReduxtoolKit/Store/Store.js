import {configureStore} from "@reduxjs/toolkit";
import  activePageReducer from '../Slice/Slice'
import authServiceReducer from '../Slice/authSlice';
import HomeDataReducer from '../Slice/HomeRedux';
import databaseServiceReducer from '../Slice/databaseSlice'; 
import cartReduxReducer from '../Slice/cartRedux';

export const store = configureStore({
    reducer : {
        activePage : activePageReducer,
        authService : authServiceReducer,
        homeDataService : HomeDataReducer ,
        cartService : cartReduxReducer,
        databaseService : databaseServiceReducer
    }
})