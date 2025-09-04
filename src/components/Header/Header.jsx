import React, { useEffect, useRef, useState } from 'react';
import { useSelector  , useDispatch} from 'react-redux';
import '../../CSS/Header.css';
import { Link } from 'react-router-dom';
import { LogOutRedux } from '../../ReduxtoolKit/Slice/authSlice';
import authService from '../../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../Database/Database';
import { LogOutUser } from '../../ReduxtoolKit/Slice/authThunk';

function Header() {

  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const cartDataRedux = useSelector(state => state.cartService);

  const [AllMobiles , setAllMobiles] = useState([]);
  const [query , setQuery] = useState('');
  const [suggestions , setSuggestions] = useState([]);
  const [selectedMobiles , setSelectedMobiles] = useState([]);

 
  const data = useSelector(state => state.authService);
  const [isLogined , setLogin] = useState(false);
  const [Name , setName] = useState('');
  const [cartLength , setCartLength] = useState(0);
  const [cartItems , setCartItems] = useState([]);
  const [searchFocus , setSearchFocus] = useState(false);

  const searchRef = useRef(null);


  useEffect(() => {
    const fetchAllMobiles = async() => {
      const AllMobilesData = await databaseService.getAlldata();
      setAllMobiles(AllMobilesData);
    }

    fetchAllMobiles();
  }, []);

  useEffect(() => {

    if(data.status){
      setLogin(true);
      const name = data.userData.name;
      setName(name);
    }

    const fetchCartData = async() => {
      if(data.status){
        const cart = cartDataRedux.cartItems;
        setCartItems(cart);
      }
      else{
        setCartItems(cartDataRedux.guestCartItems);
        // setCartItems(JSON.parse(localStorage.getItem('guestCart')) || []);
      }
    }

    fetchCartData();

  } , [data , cartDataRedux]);


  useEffect(() => {
    setCartLength(cartItems?.length || 0);
  } , [cartItems]);

  const handleSignOut = async() => {
    await authService.logOut();
    dispatch(LogOutUser());
    window.location.href = '/loginSignup'
  }

  const handleWishlist = () =>{
    if(isLogined){
      navigate('/wishlist');
    }
    else{
      alert('Please Login/SignUp to access your Wishlist.');
    }
  }

  const handleSuggestionClick = (mobile) => {
    setSuggestions([]);
    window.location.href = `/mobiles/Name/${mobile.Name}`;
  }

  const handleSearchQuery = (name) => {

    const trimmedNname = name.trim();

    if(trimmedNname === '') return ;

    setSuggestions([]);
    window.location.href = `/mobiles/Name/${name}`;
  }

  useEffect(() => {
    const trimedData = query.trim().toLowerCase();
    if(trimedData === ''){
      setSuggestions([]);
      return ;
    }

    const suggestedData = AllMobiles.filter((mobile) => mobile.Name.toLowerCase().includes(trimedData));
    setSuggestions(suggestedData);
  } , [query]);

  useEffect(() => {
      const handleClickOutside = (event) =>{
        if(searchRef.current && !searchRef.current.contains(event.target)){
          setSuggestions([]);
        }
      }

      document.addEventListener('mousedown' , handleClickOutside);

      retrun => {
        document.removeEventListener('mousedown' , handleClickOutside);
      }
  } , []); 

  return (
    <header className="header">
      <nav style={{width:'100%'}} className="nav">
        <ul className="NavBar">

          <li className="NavItemStart">
            <div className="mobileMartLogo">
              <img onClick={() => navigate('/Home')} style={{marginTop:'5px'}}
                src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/6893410e000c0818b113/view?project=6891a8f2001fdab5d3e5&mode=admin"
                alt="MobileMart Logo"
                title="MobileMart Logo"
              />
            </div>
          </li>

          <li className="NavItemCenter" ref={searchRef}> 
            <div className="searchBlock">
                <div style={{width:'100%' , position:'relative' , cursor:'pointer'}}>
                    <input className = 'searchInput'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if(e.key === 'Enter'){
                        handleSearchQuery(query);
                      }
                    }}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    placeholder="Search"
                    />
                    <div className='searchButtonBlock'>
                        <button style={{border: 'none' , background:'none'}} className="searchButton" onClick={() => handleSearchQuery(query)}>
                            <img 
                            src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/6893414b002a21db2ab9/view?project=6891a8f2001fdab5d3e5&mode=admin"
                            alt="Search"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className='suggestionsBlock'>
              <ul style={{textDecoration:'none' , listStyleType:'none' , width:'100%' , paddingLeft:'0px'}}>
                {
                  suggestions?.map((mobile , ind) => (
                    <li 
                        className='suggestedNames' 
                        style={{padding:'0.5rem' , textAlign:'start' , overflow:'hidden'}} 
                        key={ind}
                        onClick={() => handleSuggestionClick(mobile)}
  
                        >{mobile.Name}

                    </li>
                  ))
                }
              </ul>
            </div>
          </li>
         
          <li className="NavItemEnd">

            <div style={{ position:'relative' , alignItems:'center'}} className={`cartBlock ${searchFocus ? 'Hide' : ''}`}>
              <a style={{display:'flex' , alignItems:'center'  , color:'black' , textDecoration:'none'}} className="cartButton" href="/Cart">
                <svg style = {{width:"30px"}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.25 17.25H6.54545L3.93015 2.86584C3.89873 2.69303 3.80766 2.53673 3.67281 2.42419C3.53796 2.31164 3.36789 2.25 3.19225 2.25H1.5"
                    stroke="#111112" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <path d="M7.5 21C8.53553 21 9.375 20.1605 9.375 19.125C9.375 18.0895 8.53553 17.25 7.5 17.25C6.46447 17.25 5.625 18.0895 5.625 19.125C5.625 20.1605 6.46447 21 7.5 21Z"
                    stroke="#111112" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <path d="M17.25 21C18.2855 21 19.125 20.1605 19.125 19.125C19.125 18.0895 18.2855 17.25 17.25 17.25C16.2145 17.25 15.375 18.0895 15.375 19.125C15.375 20.1605 16.2145 21 17.25 21Z"
                    stroke="#111112" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <path d="M5.86363 13.5H17.6345C17.9858 13.5 18.3259 13.3767 18.5956 13.1516C18.8653 12.9265 19.0475 12.6139 19.1103 12.2683L20.25 6H4.5"
                    stroke="#111112" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                <div className='CartName' style={{marginLeft:'5px' , fontSize:'19px'}} >Cart</div>
              </a>
              <div className='cartToggle'>{cartLength}</div>
            </div>

            <div className= {`wishListBlock ${searchFocus ? 'Hide' : ''}`}>
              <a onClick={handleWishlist} className="wishlistButton">
                <svg style={{width:'25px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 16">
                  <path
                      d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z"
                      fill="white"
                      stroke="black"
                      strokeWidth='2'
                      fillRule="evenodd"
                      opacity="0.9"
                  />
                  </svg>
                <div className='WishlistName' style={{color:'black' , marginLeft:'5px'}}>Wishlist</div>
              </a>
            </div>
            
            {
              isLogined ? <div className="profileBlock">
                            <a style={{display:'flex' , alignItems:'center' , textDecoration:'none'}} className="profileButton">
                              <svg style={{width:'35px'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clipPath="url(#clip0)">
                                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                    stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                                  />
                                  <path d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z"
                                    stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                                  />
                                  <path d="M5.98047 18.6904C6.54476 17.5789 7.40581 16.6454 8.46816 15.9933C9.53052 15.3413 10.7527 14.9961 11.9992 14.9961C13.2457 14.9961 14.4679 15.3413 15.5303 15.9933C16.5926 16.6454 17.4537 17.5789 18.018 18.6904"
                                    stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <div className='dropDown'>
                                <div style={{display:'flex' , gap:'8px'}}>
                                  <div className='profileName'>{Name}</div>
                                  <div className='menuSymbol'>&#10095;</div>
                                </div>
                                <div className='dropDownContent'>
                                    <div className='profileNameIndropDown'>{Name}</div>
                                    <button onClick={() => navigate('/Orders')}>My Orders</button>
                                    <button onClick={() => handleSignOut()} >SignOut</button>
                                </div>
                              </div> 
                            </a>
                          </div>
                      : 

                        <div className="profileBlock">
                            <a style={{display:'flex' , alignItems:'center' , textDecoration:'none'}} className="profileButton" href='/LoginSignUp'>
                              <svg style={{width:'35px'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clipPath="url(#clip0)">
                                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                    stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                                  />
                                  <path d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z"
                                    stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                                  />
                                  <path d="M5.98047 18.6904C6.54476 17.5789 7.40581 16.6454 8.46816 15.9933C9.53052 15.3413 10.7527 14.9961 11.9992 14.9961C13.2457 14.9961 14.4679 15.3413 15.5303 15.9933C16.5926 16.6454 17.4537 17.5789 18.018 18.6904"
                                    stroke="black" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              <div onClick={() => navigate('/LoginSignUp')}  className='profileName' style={{fontSize:'17px' , marginLeft:'5px' , color:'black'}}>Login/SignUp</div>
                            </a>
                        </div>
            }  
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
