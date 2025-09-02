import React, { useEffect, useState } from 'react'
import databaseService from '../../Database/Database';

function OrdersPage() {


    const [orders , setOrders] = useState();

    useEffect(() => {
        fetchOrdersData();
    },[])

    const fetchOrdersData = async() => {
        const data = await databaseService.getOrderedItems();
        setOrders(data);
    }

    return (
        <div style={{padding:'5.3rem 20% 5rem 20%' , height:'100vh'}}>
            <div style={{display:'flex' , flexDirection:'column' , gap:'8px'}}>
                <div style={{backgroundColor:'white' , padding:'5px'}}>
                    Orders
                </div>
                    <div style={{display:'flex' , flexDirection:'column' , gap:'4%' , width:'100%' , height:'220px'}}>
                        {
                            orders?.length ? 
                            orders?.map((mobile , ind) => (
                                <div key={mobile.$id || ind} style={{display:'flex' , width:'100%' , height:'100%' , backgroundColor:'white' , padding:'2%' , gap:'3rem' , boxSizing:'border-box' , border:'1px solid grey'}}>
                                    <div style={{height:'200px' , width:'200px'}}>
                                        <img src={mobile.ImageUrl} alt={mobile.Name} />
                                    </div>
                                    <div style={{display:'flex' , flexDirection:'column' , textAlign:'start' , gap:'10px' , fontSize:'18px' , fontWeight:'bold' }}>
                                        <div>{mobile.Name}</div> 
                                        <div  style={{display:'flex' , margin:'5px 0' , fontWeight:'bold' , fontSize:'18px' , backgroundColor:'green' , width:'45px' , color:'white' , gap:'3px'}}>
                                            <div style={{marginLeft:'3px'}}>{mobile.Rating}</div>
                                            <span style={{display:'flex' , alignItems:'center'}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="1" style={{marginTop:'8px'}}><path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"/></svg></span>
                                        </div>
                                        <div style={{display:'flex' , gap:'5px' , fontSize:'18px'}}>
                                            <div>&#8377;{mobile.Price.toLocaleString('en-IN')}</div>
                                            <div style={{fontWeight:'normal' , fontSize:'18px'}}> | Qty : </div>
                                            <div style={{fontSize:'18px' , fontWeight:'normal'}}>{mobile.Quantity}</div>
                                        </div>
                                        <div style={{display:'flex' , flexDirection:'column' , fontSize:'16px'}}>
                                            <div style={{marginBottom:'5px'}}>Delivery To</div>
                                            <div style={{display:'flex' , marginLeft:'0px' , width:'250px' , maxWidth:'100%' , color:'grey'}}>{mobile.personName} | {mobile.personMobileNumber}</div>
                                            <div style={{display:'flex' , color:'grey' , textAlign:'start' , margin:'5px 0px 0px 0px' , fontWeight:'normal'}}>
                                                {mobile.Address}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display:'flex' , marginLeft:'auto' , width:'350px'}}>
                                        Delivery by {mobile.DeliveryDate}
                                    </div>
                                </div>
                            ))

                            :

                            <div style={{display:'flex' , flexDirection:'column' , gap:'30px' , alignItems:'center' , marginTop:'10%'}}>
                                <div style={{width:'50%' , height:'50%'}}>
                                    <img src='https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/6893412f001541832911/view?project=6891a8f2001fdab5d3e5&mode=admin' alt='orders' />
                                </div>
                                <div>Looks like you haven't ordered anything yet. Start shopping and place your first order!</div>
                            </div>
                        }
                    </div>
            </div>
        </div>
    )
}

export default OrdersPage