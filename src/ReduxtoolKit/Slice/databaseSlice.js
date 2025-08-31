import { createSlice } from "@reduxjs/toolkit";
import databaseService from "../../Database/Database";

const initialState = {
    cartData : [],
};

const databaseDetails = createSlice({
    name : 'databaseService',
    initialState,
    reducers : {
        
    }
})

export const {getDataFromCart} = databaseDetails.actions;
export default databaseDetails.reducer;