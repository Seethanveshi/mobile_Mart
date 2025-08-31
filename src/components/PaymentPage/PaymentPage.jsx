import React, { useState , useEffect } from 'react'
import OrderSummary from '../OrderSummary/OrderSummary'
import '../../CSS/PaymentPage.css'
import databaseService from '../../Database/Database';
import { getDate } from '../../JavaScript/JavaScript';
import { useNavigate } from 'react-router-dom';
import { clearCartItemsRedux } from '../../ReduxtoolKit/Slice/cartRedux';
import { useSelector , useDispatch } from 'react-redux';

function PaymentPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selected , setSelected] = useState('');

    const data = useSelector(state => state.cartService.cartItems);

    const [cartItems , setCartItems] = useState([]);
    const [totalMRP , setTotalMRP] = useState(0);
    const [discount , setDiscount] = useState(0);
    const [totalAmount , setTotalAmount] = useState(0);

    useEffect(() => {
        fetchForCart();
    } , [])

    const fetchForCart = () => {
        const OrderedAdd = JSON.parse(localStorage.getItem('deliveryAdd'));
        const address = OrderedAdd.Address + ", " + OrderedAdd.LandMark + ", " + OrderedAdd.City + ", " + OrderedAdd.District + " District, " + OrderedAdd.State + ", India, " + String(OrderedAdd.Pincode);
        const updatedData = data.map((item) => ({
            ...item,
            DeliveryDate : getDate(),
           personName : OrderedAdd.Name,
           personMobileNumber : OrderedAdd.MobileNumber,
           Address : address

        }))
        let toAmount = 0;
        let toMRP = 0;
        let toDis = 0;
        for(let i=0 ; i<data.length ; i++){
            toMRP += data[i].MRP;
            toDis += data[i].MRP-data[i].Price;
            toAmount += data[i].Price;
        }
        setTotalMRP(toMRP);
        setDiscount(toDis);
        setTotalAmount(toAmount);
        setCartItems(updatedData);
        return ;
    }

    const OrderPlaced = async() => {
        try{
            cartItems.map(async (product) => (
                await databaseService.addOrderedItems(product)
            ))
            cartItems.map(async (product) => (
                await databaseService.deleteItem(product.$id)
            ))
            dispatch(clearCartItemsRedux());
            navigate('/orderPlaced');
        }
        catch(error){
            console.log('Error in Payement Page ' , error);
        }
    }

  return (

    <div style={{padding:'5.3rem 10% 5rem 20%' , backgroundColor:'white' , height:'100%'}}>
        <div style={{display:'flex' , flexDirection:'row' , alignItems:'start' , gap:'10px'}}>
            <div style={{display:'flex' , width:'50%', border:'1px solid black' , alignItems:'center' , height:'50px' , padding:'20px 10px' , gap:'5px'}}>
                <input style={{width:'15px' , height:'15px' , margin:'0px' , textAlign:'center'}} 
                       id ="cashOndelivery" 
                       type="radio" 
                       value='CashOnDelivery'
                       onChange={(e) => setSelected(e.target.value)}
                       checked = {selected=='CashOnDelivery'}
                />
                <label style={{fontSize:'18px' , color:'green' , marginTop:'1px'}} htmlFor='cashOndelivery'>Cash on Delivery</label>
            </div>
            <div style={{width:'35%' , padding:'0px' , border:'1px solid black'}}>
                <div>
                    <div style={{backgroundColor:'white'}}>
                        <div style={{display:'flex' , flexDirection:'column' , gap:'15px' , padding:'20px 20px 30px 20px'}}>
                            <div style={{fontWeight:'bold' , borderBottom:'1px solid black'}}>
                                PRICE DETAILS ({cartItems.length} Items)
                            </div>
                            <div style={{display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
                                <div>Total MRP</div>
                                <div>&#8377;{totalMRP.toLocaleString('en-IN')}</div>
                            </div>
                            <div style={{display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
                                <div>Discount on MRP</div>
                                <div style={{color:'green'}}>-&#8377;{discount.toLocaleString('en-IN')}</div>
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
                                <div>&#8377;{totalAmount.toLocaleString('en-IN')}</div>
                            </div>
                            <div className={`${selected==='CashOnDelivery' ? 'active' : 'Inactive'}`}>
                                <button onClick={() => {OrderPlaced()}} className={`OrderSummaryButton ${selected==='CashOnDelivery' ? 'active' : ''}`}>PLACE ORDER</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentPage