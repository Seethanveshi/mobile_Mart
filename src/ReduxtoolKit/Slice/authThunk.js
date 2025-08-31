import databaseService from "../../Database/Database";
import { LoginRedux , LogOutRedux } from "./authSlice";
import { setCartItemsRedux , clearCartItemsRedux } from "./cartRedux";


export const LoginUser = (userData) => async(dispatch) => {
    
    dispatch(LoginRedux(userData));

    try{
        const cartData = await databaseService.getDataFromCart();
        console.log(cartData);
        dispatch(setCartItemsRedux(cartData));
    }
    catch(error){
        console.log('Error While Getting data from Cart ', error)
    }
}

export const LogOutUser = () => (dispatch) => {
    dispatch(LogOutRedux());
    dispatch(clearCartItemsRedux());
}