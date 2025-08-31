import React, { useEffect, useState } from 'react'
import '../../CSS/OrderSummary.css'
import databaseService from '../../Database/Database';

function OrderSummary() {

    const [cartItems , setCartItems] = useState([]);
    const [totalMRP , setTotalMRP] = useState(0);
    const [discount , setDiscount] = useState(0);
    const [totalAmount , setTotalAmount] = useState(0);

    useEffect(() => {
        fetchForCart();
    }, [])


    const fetchForCart = async() => {
        const data = await databaseService.getDataFromCart();
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
        setCartItems(data);
        return ;
    }

    return (
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
                    <div>
                        <button className='placeOrderButton' >PLACE ORDER</button> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary