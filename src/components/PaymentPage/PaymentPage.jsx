import React, { useState , useEffect } from 'react'
import OrderSummary from '../OrderSummary/OrderSummary'
import '../../CSS/PaymentPage.css'
import databaseService from '../../Database/Database';
import { getDate } from '../../JavaScript/JavaScript';
import { useNavigate } from 'react-router-dom';
import { clearCartItemsRedux } from '../../ReduxtoolKit/Slice/cartRedux';
import { useSelector , useDispatch } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function PaymentPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selected , setSelected] = useState('');

    const data = useSelector(state => state.cartService.cartItems);

    const [cartItems , setCartItems] = useState([]);
    const [totalMRP , setTotalMRP] = useState(0);
    const [discount , setDiscount] = useState(0);
    const [totalAmount , setTotalAmount] = useState(0);

    const [Loading , setLoading] = useState(false);

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
            setLoading(true);
            cartItems.map(async (product) => (
                await databaseService.addOrderedItems(product)
            ))
            cartItems.map(async (product) => (
                await databaseService.deleteItem(product.$id)
            ))
            dispatch(clearCartItemsRedux());
            setLoading(false);
            navigate('/orderPlaced');
        }
        catch(error){
            setLoading(false);
            console.log('Error in Payement Page ' , error);
        }
    }

                
    if(Loading) return <LoadingSpinner />


  return (

    <div className="paymentPage">
        <div className="paymentPageWrapper">
            <div className="paymentOptions">
            <input
                className="radioInput"
                id="cashOndelivery"
                type="radio"
                value="CashOnDelivery"
                onChange={(e) => setSelected(e.target.value)}
                checked={selected === "CashOnDelivery"}
            />
            <label className="radioLabel" htmlFor="cashOndelivery">
                Cash on Delivery
            </label>
            </div>

            <div className="orderSummarySectionPaymentPage">
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

                        <div className={selected === "CashOnDelivery" ? "active" : "Inactive"}>
                            <button
                                onClick={() => {
                                    OrderPlaced();
                                }}
                                className={`placeOrderButton ${
                                    selected === "CashOnDelivery" ? "active" : ""
                                }`}
                                >
                                PLACE ORDER
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default PaymentPage