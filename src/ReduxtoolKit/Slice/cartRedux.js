import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const storedCartData = JSON.parse(localStorage.getItem('cartData')) || [];
const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

const initialState = {
    cartItems : storedCartData?.length>0 ? storedCartData : [],
    guestCartItems : guestCart?.length>0 ? guestCart : [],
};

const cartReduxService = createSlice({
    name :'cartRedux',
    initialState,
    reducers : {
        setCartItemsRedux : (state , action) => {

            state.cartItems = action.payload;
            if(state.cartItems){
                localStorage.setItem('cartData' , JSON.stringify(state.cartItems));
            }
        },

        clearCartItemsRedux : (state) => {
            state.cartItems ? state.cartItems.length = 0 : [];
            localStorage.removeItem('cartData');
        },

        setGuestCartItemsRedux : (state , action) => {
            state.guestCartItems = action.payload;
            if(state.guestCartItems){
                localStorage.setItem('guestCart' , JSON.stringify(state.guestCartItems));
            }
        }
    

    }
})

export const {setCartItemsRedux , clearCartItemsRedux , setGuestCartItemsRedux} = cartReduxService.actions;
export default cartReduxService.reducer;