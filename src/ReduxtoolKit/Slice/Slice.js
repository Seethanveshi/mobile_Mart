import { createSlice } from "@reduxjs/toolkit";

const initialState = 'Login';

export const activePageSlice = createSlice({
    name : 'activePage',
    initialState,
    reducers : {
        updateActivePage : (state , action) => {
            return state = action.payload;
        }
    }
})

export const {updateActivePage} = activePageSlice.actions;
export default activePageSlice.reducer;
