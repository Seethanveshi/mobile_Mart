import React, { useState , useEffect } from 'react'
import { getDate } from '../../JavaScript/JavaScript';
import { useSelector , useDispatch } from 'react-redux';
import databaseService from '../../Database/Database';
import '../../CSS/OrderSummary.css'
import { useNavigate } from 'react-router-dom';
import { setCartItemsRedux , setGuestCartItemsRedux } from '../../ReduxtoolKit/Slice/cartRedux';
import '../../CSS/Cart.css'

function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.authService);
    const cartdataRedux = useSelector(state => state.cartService);

    const [cartItems , setCartItems] = useState([]);
    const [totalMRP , setTotalMRP] = useState(0);
    const [discount , setDiscount] = useState(0);
    const [totalAmount , setTotalAmount] = useState(0);

    const [Loading , setloading] = useState(false);

    useEffect(() => {
      fetch();
    }, []);

    const fetch = async () =>{
        if(reduxData.status){
            const cartData = cartdataRedux.cartItems;
            const updatedData = cartData?.map(item => ({
                ...item, 
                deliveryDate : getDate()
            }))
            setCartItems(updatedData);
        }
        else{
            const  cartData = cartdataRedux.guestCartItems ;
            const updatedData = cartData?.map(item => ({
                ...item, 
                deliveryDate : getDate()
            }))
            setCartItems(updatedData);
        }
 
        return ;
    } 

    const qtyHandler = (val , mobileData) => {

        const newQty = mobileData.Quantity+val;
        const ID = mobileData.$id;

        if(newQty<=0) return RemoveHandler(mobileData.$id);

        const updatedCart = cartItems?.map(item => item.$id == ID ? {...item , Quantity : newQty} : item);

        setCartItems(updatedCart);

        if(reduxData.status){
            dispatch(setCartItemsRedux(updatedCart));
            console.log(ID);
            databaseService.updateQuantity({val:newQty , ID:ID});
        }
        else{
            dispatch(setGuestCartItemsRedux(updatedCart));
            localStorage.setItem('guestCart' , JSON.stringify(updatedCart));
        }

    }

    const RemoveHandler = (ID) => {

        const updatedCart = cartItems?.filter((data) => data.$id!==ID);
        setCartItems(updatedCart);
        
        if(reduxData.status){
            dispatch(setCartItemsRedux(updatedCart));
            databaseService.deleteItem(ID);
        }
        else{
            dispatch(setGuestCartItemsRedux(updatedCart));
            localStorage.setItem('guestCart' , JSON.stringify(updatedCart));
        }
        return ;
    }

    useEffect(() => {
        let totalAmount = 0;
        let discount = 0;
        let totalMRP = 0;
        for(let i=0 ; i<cartItems?.length ; i++){
            totalMRP += (cartItems[i].MRP) * cartItems[i].Quantity;
            discount += (cartItems[i].MRP-cartItems[i].Price) * cartItems[i].Quantity;
            totalAmount += (cartItems[i].Price) * cartItems[i].Quantity;
        }

        setTotalMRP(totalMRP);
        setDiscount(discount);
        setTotalAmount(totalAmount);
    } , [cartItems]);

    return (
        <div className='cartPage'>
        {
            cartItems?.length<=0 ? 
                <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center' , gap:'10px'}}>
                    <div className='emptycartImage'>
                        <img src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68a8443c00356cdb3dfd/view?project=6891a8f2001fdab5d3e5&mode=admin" />
                    </div>
                    <div className='emptyCartStatement'>
                        <div>There is nothing in your Cart. Let's add some items</div>
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <a href="/Home">
                            <button className='homeButton' >Home Page</button>
                        </a>
                    </div>
                </div>
            :

                <div className='cartBlock'>
                    <div className='cartItemsSection'>
                        <div className='cartItems'>
                            {
                            cartItems?.map((mobile , ind) => (
                                <div className='cartItemDetailsBlock' key={mobile.$id || ind}>
                                    <div className='ImageBlock'>
                                        <img src={mobile.ImageUrl} alt={mobile.Name} />
                                    </div>
                                    <div className='cartItemDetails'>
                                        <div className='DetailsandDeliveryDate'>
                                            <div>
                                                <div>{mobile.Name}</div>
                                                <div className='Rating'>
                                                    <div style={{marginLeft:'3px'}}>{mobile.Rating}</div>
                                                    <span style={{display:'flex' , alignItems:'center'}}><svg className='starSymbol' xmlns="http://www.w3.org/2000/svg" width="20" height="1"><path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"/></svg></span>
                                                </div>
                                            </div>
                                            <div className='deliveryDate'>
                                                {mobile.deliveryDate}
                                            </div>
                                        </div>
                                        <div className='priceDetails'>
                                            <div>&#8377;{mobile.Price?.toLocaleString('en-IN')}</div>
                                            <div style={{color:'grey' , textDecorationLine:'line-through'}} >&#8377;{mobile.MRP?.toLocaleString('en-IN')}</div>
                                            <div style={{color:'green'}} >{(((mobile.MRP-mobile.Price)/mobile.MRP)*100).toFixed(2)}%</div>
                                        </div>
                                        <div className='quantityDetails'>
                                            <div className='quantityName'>Qty : </div>
                                            <button className='minusButton' onClick={() => {qtyHandler(-1 , mobile)}} >-</button>
                                            <div className='Quantity' >{mobile.Quantity}</div>
                                            <button className='plusButton' onClick={() => {qtyHandler(1 , mobile)}} >+</button>
                                            <button className='removeButton' onClick={() => {RemoveHandler(mobile.$id)}}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className="orderSummarySection">
                        <div className="orderSummary">
                            <div className="orderSummaryContent">
                                <div className="priceDetailsTitle">
                                    PRICE DETAILS ({cartItems?.length} Items)
                                </div>

                                <div className="priceRow">
                                    <div>Total MRP</div>
                                    <div>&#8377;{totalMRP?.toLocaleString('en-IN')}</div>
                                </div>

                                <div className="priceRow">
                                    <div>Discount on MRP</div>
                                    <div className="discountOnMRP">-&#8377;{discount?.toLocaleString('en-IN')}</div>
                                </div>

                                <div className="priceRow">
                                    <div>Platform Fee</div>
                                    <div className="platformFee">FREE</div>
                                </div>

                                <div className="priceRow">
                                    <div>Shipping Fee</div>
                                    <div className="shippingFee">
                                        <div className="lineThroughSmall">&#8377;79</div>
                                        <span className="shippingFee">FREE</span>
                                    </div>
                                </div>

                                <div className="totalAmountRow">
                                    <div>Total Amount</div>
                                    <div>&#8377;{totalAmount?.toLocaleString('en-IN')}</div>
                                </div>

                                <div>
                                    <button
                                        onClick={() =>
                                            reduxData.status ? navigate('/Address') : navigate('/LoginSignUp')
                                        }
                                        className="placeOrderButton"
                                        >
                                        PLACE ORDER
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        }
        </div>
    )
}

export default Cart
