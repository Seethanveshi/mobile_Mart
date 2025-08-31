import React, { useState , useEffect } from 'react'
import { getDate } from '../../JavaScript/JavaScript';
import { useSelector , useDispatch } from 'react-redux';
import databaseService from '../../Database/Database';
import '../../CSS/OrderSummary.css'
import { useNavigate } from 'react-router-dom';
import { setCartItemsRedux } from '../../ReduxtoolKit/Slice/cartRedux';

function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxData = useSelector(state => state.authService);
    const cartdataRedux = useSelector(state => state.cartService.cartItems);

    const [cartItems , setCartItems] = useState([]);
    const [totalMRP , setTotalMRP] = useState(0);
    const [discount , setDiscount] = useState(0);
    const [totalAmount , setTotalAmount] = useState(0);

    useEffect(() => {
      fetch();
    }, []);

    const fetch = async () =>{
        if(reduxData.status){
            const cartData = cartdataRedux;
            const updatedData = cartData?.map(item => ({
                ...item, 
                deliveryDate : getDate()
            }))
            setCartItems(updatedData);
        }
        else{
            const  cartData = JSON.parse(localStorage.getItem('guestCart')) || [];
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
        else localStorage.setItem('guestCart' , JSON.stringify(updatedCart));

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
        <div  style={{padding:'5.3rem 10% 0rem 10%' , backgroundColor:''}}>
        {
            cartItems?.length<=0 ? 
                <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center' , gap:'10px'}}>
                    <div style={{width:'350px' , height:'350px'}}>
                        <img src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68a8443c00356cdb3dfd/view?project=6891a8f2001fdab5d3e5&mode=admin" />
                    </div>
                    <div>
                        <div>There is nothing in your Cart. Let's add some items</div>
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <a href="/Home">
                            <button style={{padding:'15px 40px' , background:'none' , borderRadius:'10px' , color:'green' , border:'1px solid green' , fontWeight:'bold'}} >Home Page</button>
                        </a>
                    </div>
                </div>
            :

                <div style={{display:'flex' , justifyContent:'space-between' , gap:'15px'}}>
                    <div style={{width:'68%'}}>
                        <div style={{display:'flex' , flexDirection:'column' , gap:'4%' , width:'100%' , height:'220px'}}>
                            {
                            cartItems?.map((mobile , ind) => (
                                <div key={mobile.$id || ind} style={{display:'flex' , width:'100%' , height:'100%' , backgroundColor:'white' , padding:'2%' , gap:'3rem' , boxSizing:'border-box' , border:'1px solid grey'}}>
                                <div>
                                    <img src={mobile.ImageUrl} alt={mobile.Name} />
                                </div>
                                <div style={{display:'flex' , flexDirection:'column' , textAlign:'start' , gap:'10px' , fontSize:'20px' , fontWeight:'bold' }}>
                                    <div>{mobile.Name}</div>
                                    <div  style={{display:'flex' , margin:'5px 0' , fontWeight:'bold' , fontSize:'18px' , backgroundColor:'green' , width:'45px' , color:'white' , gap:'3px'}}>
                                        <div style={{marginLeft:'3px'}}>{mobile.Rating}</div>
                                        <span style={{display:'flex' , alignItems:'center'}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="1" style={{marginTop:'8px'}}><path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"/></svg></span>
                                    </div>
                                    <div style={{display:'flex' , gap:'5px' , fontSize:'19px'}}>
                                    <div>&#8377;{mobile.Price?.toLocaleString('en-IN')}</div>
                                    <div style={{color:'grey' , textDecorationLine:'line-through'}} >&#8377;{mobile.MRP?.toLocaleString('en-IN')}</div>
                                    <div style={{color:'green'}} >{(((mobile.MRP-mobile.Price)/mobile.MRP)*100).toFixed(2)}%</div>
                                    </div>
                                    <div style={{display:'flex' , gap:'10px' , alignItems:'center'}}>
                                    <div style={{fontWeight:'normal' , fontSize:'18px'}}>Qty : </div>
                                    <button onClick={() => {qtyHandler(-1 , mobile)}} style={{border:'1px solid black' , borderRadius:'50%' , padding:'3px 10px' , fontSize:'20px' , textAlign:'justify' , background:'none'}}>-</button>
                                    <div style={{fontSize:'18px'}}>{mobile.Quantity}</div>
                                    <button onClick={() => {qtyHandler(1 , mobile)}} style={{border:'1px solid black' , borderRadius:'50%' , padding:'5px 10px' , fontSize:'16px' , background:'none'}}>+</button>
                                    <button onClick={() => {RemoveHandler(mobile.$id)}} style={{background:'none' , border:'none' , fontSize:'16px'}}>Remove</button>
                                    </div>
                                </div>
                                <div style={{ marginLeft:'auto'}}>
                                    {mobile.deliveryDate}
                                </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div style={{width:'35%' , position:'sticky' , left:'65%'}}>
                        <div style={{backgroundColor:'white'}}>
                            <div style={{display:'flex' , flexDirection:'column' , gap:'15px' , padding:'20px 20px 30px 20px'}}>
                                <div style={{fontWeight:'bold' , borderBottom:'1px solid black'}}>
                                    PRICE DETAILS ({cartItems?.length} Items)
                                </div>
                                <div style={{display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
                                    <div>Total MRP</div>
                                    <div>&#8377;{totalMRP?.toLocaleString('en-IN')}</div>
                                </div>
                                <div style={{display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
                                    <div>Discount on MRP</div>
                                    <div style={{color:'green'}}>-&#8377;{discount?.toLocaleString('en-IN')}</div>
                                </div>
                                <div style={{display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
                                    <div>Platform Fee</div>
                                    <div style={{color:'green' , fontSize:'12px'}}>FREE</div>
                                </div>
                                <div style={{display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
                                    <div>Shipping Fee</div>
                                    <div style={{display:'flex'}}>
                                        <div style={{textDecorationLine:'line-through' , fontSize:'12px'}}>&#8377;79</div>
                                        <span style={{color:'green' , fontSize:'12px '}}>FREE</span>
                                    </div>
                                </div>
                                <div style={{display:'flex' , justifyContent:'space-between' , borderStyle:'dashed none' , padding:'10px 0px' , fontWeight:'bold' , fontSize:'18px' , borderWidth:'1px'}}>
                                    <div>Total Amount</div>
                                    <div>&#8377;{totalAmount?.toLocaleString('en-IN')}</div>
                                </div>
                                <div>
                                    <button onClick={() => reduxData.status ? navigate('/Address') : navigate('/LoginSignUp')} className='placeOrderButton' >PLACE ORDER</button> 
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