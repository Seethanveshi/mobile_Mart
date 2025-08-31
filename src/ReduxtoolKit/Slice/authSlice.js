import { createSlice } from "@reduxjs/toolkit";
import databaseService from "../../Database/Database";
import { clearCartItemsRedux, setCartItemsRedux } from "./cartRedux";

const storedData = JSON.parse(localStorage.getItem('auth'));

const initialState = storedData ||  {
    userData : '',
    passwordValid : false,
    status : false
}

export const authSlice = createSlice({
    name : 'authService',
    initialState,
    reducers : {
        LoginRedux : (state , action) => {
            state.userData = action.payload;
            state.status = true;

            if(state.userData) localStorage.setItem('auth' , JSON.stringify({
                userData:state.userData,
                status : state.status,
                passwordValid : state.passwordValid
            }));
        },

        LogOutRedux : (state , action) => {
            state.userData = null;
            state.status = false;
            state.passwordValid = false

            localStorage.removeItem('auth');
        },
        PasswordValid : (state , action) => {
            const len = action.payload.length;
            if(len<8) state.passwordValid = false;
            else state.passwordValid = true;
        }

    }
})

export const {LoginRedux , LogOutRedux , PasswordValid} = authSlice.actions;
export default authSlice.reducer;