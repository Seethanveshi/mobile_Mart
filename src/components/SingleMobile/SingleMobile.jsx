import React, { useEffect, useState } from 'react'
import databaseService from '../../Database/Database'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { setCartItemsRedux } from '../../ReduxtoolKit/Slice/cartRedux';

function SingleMobile() {

    const reduxData = useSelector(state => state.authService);
    const cartDataRedux = useSelector(state => state.cartService.cartItems);
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
            const data = cartDataRedux;
            setCartItems(data);
        }
        else{
            setCartItems(JSON.parse(localStorage.getItem('guestCart')) || []);
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
                localStorage.setItem('guestCart' , JSON.stringify(updatedArray));   
            }
        }

        return ;
        
    }


    const handleWishlist = () => {
        if(!wish) databaseService.addToWishlist(mobile);
        else databaseService.deleteFromWishlist(mobile.$id);
        setWish((prev) => !prev);
    }

    const BuyNow = async (mobile) => {
        await addToCart(mobile);
        window.location.href = '/cart';
    }


    // console.log(mobile);

    return (
        <div style={{padding:'4.8rem 5% 0rem 5%' , boxSizing:'border-box' ,  height:'100%' , width:'100%'}}>
            <div style={{width:'100%' , height:'100%' , display:'flex' , flexDirection:'row' , paddingTop:'20px' , backgroundColor:'white' , gap:'30px'}}>
                <div style={{display:'flex' , flexDirection:'column' , width:'35%' , position:'fixed'}}>
                    <div style={{position:'relative' ,  border: "1px solid grey" , width:'85%' , height:'470px' , marginLeft:'15%' , boxSizing:'border-box' , padding:'1rem 3rem'}}>
                        <img 
                            src={mobile.ImageUrl}
                            alt={mobile.Name}
                        />
                        <button
                            onClick={handleWishlist}
                            style={{ 
                                position: 'absolute',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)', // subtle shadow
                                borderRadius: '50%',
                                padding: '10px',
                                border:'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                top:'3%',
                                right:'3%'
                            }}
                            >
                            {wish ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 16">
                                <path
                                    d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z"
                                    fill="red"
                                    stroke="white"
                                    fillRule="evenodd"
                                    opacity="0.9"
                                />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 16">
                                <path
                                    d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z"
                                    fill="grey"
                                    stroke="white"
                                    fillRule="evenodd"
                                    opacity="0.9"
                                />
                                </svg>
                            )}
                            </button>
                    </div>
                    <div style={{display:'flex' , marginLeft:'15%' , gap:'0.5rem' , marginTop:'1rem' , marginBottom:'1rem'}}>
                        <button onClick={() => BuyNow(mobile)} style={{flex:'1' , padding:'1.2rem' , border:'none' , backgroundColor:'rgb(255, 106, 0)' , fontWeight:'bold' , fontSize:'15px' , color:'white'}}>
                            Buy Now
                        </button>
                        <button onClick={() => addToCart(mobile)} style={{flex:'1' , padding:'1.2rem' , border:'none' , backgroundColor:'rgba(255, 166, 0, 0.926)' , fontWeight:'bold' , fontSize:'15px' , color:'white'}}>
                            Add Cart
                        </button>
                    </div>
                </div>
                <div style={{padding:'0px 80px 50px 15px' , display:'flex' , flexDirection:'column' , gap:'15px' , width:'55%' , marginLeft:'41%'}}>
                    <div style={{display:'flex' , fontWeight:'bold' , fontSize:'22px'}}>{mobile.Name}</div>
                    <div  style={{display:'flex' , margin:'5px 0' , fontWeight:'bold' , fontSize:'20px' , backgroundColor:'green' , width:'50px' , color:'white' , gap:'3px'}}>
                        <div style={{marginLeft:'5px'}}>{mobile.Rating}</div>
                        <span style={{display:'flex' , alignItems:'center'}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="1" style={{marginTop:'8px'}}><path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"/></svg></span>
                    </div>
                    <div style={{display:'flex' , fontWeight:'bold' , fontSize:'24px'}}>&#8377;{mobile.Price?.toLocaleString('en-IN')}</div>
                    <div style={{display:'flex' , gap:'20px'}}>
                        <div style={{marginTop:'15px' , fontSize:'20px'}}>
                            Highlights
                        </div>
                        <div>
                            <ul style={{display:'flex' , flexDirection:'column' , paddingLeft:'0px' , gap:'8px'}}>
                                {
                                mobile.Highlights?.map((highl , ind) => (
                                    <div key={ind} style={{display:'flex' , alignItems:'center' , gap:'8px'}}>
                                        <div style={{backgroundColor:'grey' , width:'5px' , height:'5px' , borderRadius:'50%'}}></div>
                                        <li key={ind}  style={{ display:'flex'}}>{highl}</li>
                                    </div>
                                ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div>
                        <table style={{ border: '1px solid grey', width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <th
                                    style={{
                                        border: '1px solid grey',
                                        padding: '20px',
                                        fontSize: '22px',
                                        textAlign: 'left'
                                    }}
                                    colSpan="2"
                                    >
                                    Specifications
                                    </th>
                                </tr>

                                <tr>
                                    <td
                                    style={{
                                        width: '100%',
                                        padding: 0,
                                        border: 'none'
                                    }}
                                    colSpan="2"
                                    >
                                        
                                                
                                    {
                                        specs?.map((specs, specInd) => (
                                            <React.Fragment key={specInd}>
                                                <table
                                                    style={{
                                                    width: '100%',
                                                    borderBottom: '1px solid grey',
                                                    borderCollapse: 'collapse',
                                                    margin: 0
                                                    }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                            style={{
                                                                textAlign: 'center',
                                                                width: '100%',
                                                                fontSize: '20px',
                                                                fontWeight: 'bold',
                                                                padding: '10px'
                                                            }}
                                                            colSpan="2"
                                                            >
                                                            {specs.section}
                                                            </td>
                                                        </tr>
                                                        {
                                                            specs.specs?.map((keyvalueObj, ind) => {
                                                            const key = Object.keys(keyvalueObj)[0];
                                                            const value = keyvalueObj[key];
                                                            return (
                                                                <tr key={ind}>
                                                                    <td style={{ textAlign: 'left', padding: '10px' , width:'30%' }}>{key}</td>
                                                                    <td style={{ textAlign: 'left', padding: '10px' }}>{value}</td>
                                                                </tr>
                                                            );
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </React.Fragment>
                                        ))
                                    }

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