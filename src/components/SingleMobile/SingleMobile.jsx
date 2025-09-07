import React, { useEffect, useState } from 'react'
import databaseService from '../../Database/Database'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { setCartItemsRedux , setGuestCartItemsRedux} from '../../ReduxtoolKit/Slice/cartRedux';
import '../../CSS/SingleMobile.css';

function SingleMobile() {

    const reduxData = useSelector(state => state.authService);
    const cartDataRedux = useSelector(state => state.cartService);
    const navigate = useNavigate();
    const {id} = useParams();

    const [mobile , setMobileData] = useState({});
    const [cartItem , setCartItems] = useState([]);
    const [specs , setSpecs] = useState([]);

    const [wish , setWish] = useState(false);
 
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCartItems();
    } , [cartDataRedux]);

    const fetchCartItems = async() =>{
        if(reduxData.status){
            const data = cartDataRedux.cartItems;
            setCartItems(data);
        }
        else{
            setCartItems(cartDataRedux.guestCartItems);
            // setCartItems(JSON.parse(localStorage.getItem('guestCart')) || []);
        }
    }

    const fetchdata = async() =>{
        const mobileData = await databaseService.getData(id);

        setMobileData(mobileData);

        const specSections = mobileData.Specifications;
        const keyValues = mobileData.KeyValues;

        const result = [];
        let currentSpecs = [];
        let sectionIndex = 0;

        for (const item of keyValues) {
            if (item === "NULL") {

                result.push({
                section: specSections[sectionIndex],
                specs: currentSpecs 
            });
            currentSpecs = [];
            sectionIndex++;
            }

            else {

            const splitIndex = item.indexOf(':');
                if(splitIndex !== -1) {
                    const key = item.slice(0, splitIndex).trim();
                    const value = item.slice(splitIndex + 1).trim();
                    currentSpecs.push({ [key]: value });
                }
            }
        }
        setSpecs(result);

    }


    const fetchWishlistData = async() => {
        const data = await databaseService.getWishlist();

        const ind = data?.findIndex((product) => product.ProductId == id) || -1;

        if(ind!=-1) setWish(true);
    }


    useEffect(() => {
        fetchdata();
        fetchWishlistData();
    } , []);


    const addToCart = async(mobile) =>{
        const ind = cartItem.findIndex(item => item.$id == mobile.$id);


        if(ind != -1){
            const updatedArray = [...cartItem];
            updatedArray[ind] = {...updatedArray[ind] , Quantity : updatedArray[ind].Quantity+1};
            setCartItems(updatedArray);

            if(reduxData.status){
                dispatch(setCartItemsRedux(updatedArray));
                await databaseService.updateQuantity({val : updatedArray[ind].Quantity , ID:mobile.$id});
            }
            else{
                dispatch(setGuestCartItemsRedux(updatedArray));
                localStorage.setItem('guestCart' , JSON.stringify(updatedArray));
            }
        }
        else{
            const updatedArray = [...cartItem , {...mobile , Quantity:1}];
            setCartItems(updatedArray);
            
            console.log(updatedArray , 'outside');

            if(reduxData.status){
                console.log(updatedArray , 'inside');
                dispatch(setCartItemsRedux(updatedArray));
                await databaseService.addToCart(mobile);
            }
            else{
                dispatch(setGuestCartItemsRedux(updatedArray));
                localStorage.setItem('guestCart' , JSON.stringify(updatedArray));   
            }
        }

        return ;
        
    }


    const handleWishlist = () => {

        if(reduxData.status){
            if(!wish) databaseService.addToWishlist(mobile);
            else databaseService.deleteFromWishlist(mobile.$id);
            setWish((prev) => !prev);
        }
        else{
            alert('Please Login/SignUp to add items to your wishlist.')
        }
    }

    const BuyNow = async (mobile) => {
        await addToCart(mobile);
        window.location.href = '/cart';
    }


    // console.log(mobile);

    return (

        <div className="singleMobilePage">
            <div className="singleMobileWrapper">
                <div className="singleMobile_mobileLeftSection">
                    <div className='singleMobile_mobileLeftSectionImageandButtons'>
                        <div className="singleMobile_mobileImageContainer">    
                            <img src={mobile.ImageUrl} alt={mobile.Name} />
                            <button onClick={handleWishlist} className="singleMobile_wishlistButtonToolkit">
                                {wish ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 16"> 
                                        <path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" 
                                        fill="red" stroke="white" fillRule="evenodd" opacity="0.9" /> 
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 16"> 
                                        <path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" 
                                        fill="grey" stroke="white" fillRule="evenodd" opacity="0.9" /> 
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="singleMobile_CartandBuyNowButtons">
                            <button onClick={() => BuyNow(mobile)} className="singleMobile_buyNowButton">Buy Now</button>
                            <button onClick={() => addToCart(mobile)} className="singleMobile_addCartButton">Add Cart</button>
                        </div>
                    </div>
                    
                    <div className="singleMobile_RightSectionMobileDetails">
                        <div className="singleMobile_mobileTitle">{mobile.Name}</div>
                        <div className="singleMobile_mobileRating">
                            <div className="singleMobile_ratingValue">{mobile.Rating}</div> 
                            <span className="singleMobile_ratingStar" style={{ display: 'flex', alignItems: 'center' }}>
                                <svg className="singleMobile_starImage" xmlns="http://www.w3.org/2000/svg" width="20" height="1" style={{ marginTop: '5px' }}>
                                    <path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z" />
                                </svg>
                            </span>
                        </div>
                        <div className="singleMobile_mobilePrice">&#8377;{mobile.Price?.toLocaleString('en-IN')}</div>

                        <div className="singleMobile_mobileHighlights">
                            <div className="singleMobile_highlightTitle">Highlights</div>
                            <div>
                                <ul className="singleMobile_highlightList">
                                    {mobile.Highlights?.map((highl, ind) => (
                                        <div key={ind} className="singleMobile_highlightItem">
                                            <div className="singleMobile_highlightBullet"></div>
                                            <li>{highl}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="singleMobile_RightSectionMobileSpecs">
                    <div>
                        <table className="singleMobile_specsTable">
                            <tbody>
                                <tr>
                                    <th className="singleMobile_specsHeading" colSpan="2">Specifications</th>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ padding: 0, border: 'none' }}>
                                        {specs?.map((specs, specInd) => (
                                            <React.Fragment key={specInd}>
                                                <table className="singleMobile_specsSubtable">
                                                    <tbody>
                                                        <tr>
                                                            <td className="singleMobile_specsSubheading" colSpan="2">{specs.section}</td>
                                                        </tr>
                                                        {specs.specs?.map((keyvalueObj, ind) => {
                                                            const key = Object.keys(keyvalueObj)[0];
                                                            const value = keyvalueObj[key];
                                                            return (
                                                                <tr key={ind}>
                                                                    <td className="singleMobile_specsKey">{key}</td>
                                                                    <td className="singleMobile_specsValue">{value}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </React.Fragment>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SingleMobile