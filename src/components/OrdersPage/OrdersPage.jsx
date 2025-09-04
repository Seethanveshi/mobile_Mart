import React, { useEffect, useState } from 'react'
import databaseService from '../../Database/Database';
import '../../CSS/OrdersPage.css';

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
        <div className='ordersPage'>
            <div style={{display:'flex' , flexDirection:'column' , gap:'8px'}}>
                <div style={{backgroundColor:'white' , padding:'5px'}}>
                    Orders
                </div>
                <div className='OrderedItemsSection'>
                    {
                        orders?.length ? 
                        orders?.map((mobile , ind) => (
                            <div className='OrderedItem' key={mobile.$id || ind}>
                                <div>
                                    <img src={mobile.ImageUrl} alt={mobile.Name} />
                                </div>
                                <div className='OrderedItemDetails'>
                                    <div className='DetailsandDeliveryDate'>
                                        <div>
                                            <div>{mobile.Name}</div> 
                                            <div className='Rating'>
                                                <div style={{marginLeft:'3px'}}>{mobile.Rating}</div>
                                                <span style={{display:'flex' , alignItems:'center'}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="1" style={{marginTop:'8px'}}><path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"/></svg></span>
                                            </div>
                                            <div className='PriceandQuantity'>
                                                <div>&#8377;{mobile.Price.toLocaleString('en-IN')}</div>
                                                <div style={{fontWeight:'normal'}}> | Qty : </div>
                                                <div style={{fontSize:'18px' , fontWeight:'normal'}}>{mobile.Quantity}</div>
                                            </div>
                                        </div>
                                        <div className='DeliveryDate'>
                                            Delivery by {mobile.DeliveryDate}
                                        </div>
                                    </div>
                                    <div className='AddressSection'>
                                        <div style={{marginBottom:'5px'}}>Delivery To</div>
                                        <div className='AddressDetails'>{mobile.personName} | {mobile.personMobileNumber}</div>
                                        <div  className='Address'>
                                            {mobile.Address}
                                        </div>
                                    </div>
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