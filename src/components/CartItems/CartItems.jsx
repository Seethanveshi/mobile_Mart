import React, { useCallback, useDebugValue, useEffect, useMemo, useState } from 'react'
import {getDate } from '../../JavaScript/JavaScript';
import { useSelector , useDispatch } from 'react-redux';
import databaseService from '../../Database/Database';

function CartItems() {

    const [data , setData] = useState([]);
    const [isDone , setDone] = useState(false);



    const fetch = async () =>{
      const cartData = await databaseService.getDataFromCart();
      const updatedData = cartData.map(item => ({
          ...item, 
          deliveryDate : getDate()
      }))
      setData(updatedData);
    } 

    useEffect(() => {
      fetch();
    }, []);

    const currentDate = () => {
      return getDate();
    };

    const qtyHandler = useCallback((val , mobileData) => {

      const newQty = mobileData.Quantity+val;

      if(newQty==0) return RemoveHandler(mobileData.$id);

      setData((prev) => 
        prev.map((data) => data.$id==mobileData.$id ? {...data , Quantity : newQty} : data)
      )

      const ID = mobileData.$id;
      databaseService.updateQuantity({val:newQty , ID:ID});

      
    })

    const RemoveHandler = (ID) => {
      setData(prev => prev.filter((data) => data.$id!==ID));
      databaseService.deleteItem(ID);
      return ;
    }


  return (
    <div style={{padding:'5.3rem 0% 0rem 0%'}}>
      <div style={{display:'flex' , flexDirection:'column' , gap:'4%' , width:'100%' , height:'220px'}}>
        {
          data?.map((mobile , ind) => (
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
                  <div>&#8377;{mobile.Price.toLocaleString('en-IN')}</div>
                  <div style={{color:'grey' , textDecorationLine:'line-through'}} >&#8377;{mobile.MRP.toLocaleString('en-IN')}</div>
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
  )
}

export default CartItems