import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newArrivals : [],
    flagShips : [],
    midRanges : [],
    budgets : []
};

export const HomeDetails = createSlice({
    name : 'HomeData',
    initialState,
    reducers : {
        newArrival : (state , action) => {
            state.newArrivals = (action.payload);
        },
        flagShip : (state , action) => {
            state.flagShips = (action.payload);
        },
        midRange : (state , action) => {
            state.midRanges = (action.payload);
        },
        budget : (state , action) => {
            state.budgets = (action.payload);
        }
    }
})


export const {newArrival , flagShip , midRange , budget} = HomeDetails.actions;
export default HomeDetails.reducer;
