import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const storedCartData = JSON.parse(localStorage.getItem('cartData')) || [];


const initialState = {
    cartItems : storedCartData?.length>0 ? storedCartData : [],
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
        }
    }
})

export const {setCartItemsRedux , clearCartItemsRedux} = cartReduxService.actions;
export default cartReduxService.reducer;