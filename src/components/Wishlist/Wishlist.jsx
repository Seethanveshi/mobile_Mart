import React, { useEffect, useState } from 'react'
import databaseService from '../../Database/Database';
import '../../CSS/Wishlist.css'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Wishlist() {

    const [wishList , setWishlist] = useState([]);
    const [Loading , setLoading] = useState(false);

    useEffect(() =>{
        const fetchWishlistData = async() => {
            setLoading(true);
            const data = await databaseService.getWishlist();
            setLoading(false);
            setWishlist(data);
        }

        fetchWishlistData();
    } , []);

    if(Loading) return <LoadingSpinner />

  return (
    <div className="wishlistPage">
      <div>
        {
          wishList?.length <= 0 ? (
            <div className="wishlistEmpty">
              <div className="wishlistEmptyIcon">
                <svg width="120" height="120" 
                  viewBox="0 0 24 24" fill="none" 
                  xmlns="http://www.w3.org/2000/svg"> 
                    <path d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22L12 18L18 22C18.5523 22 19 21.5523 19 21V3C19 2.44772 18.5523 2 18 2H6Z" 
                      stroke="black" stroke-width="0.7" fill="none"/> 
                      <path d="M12 10.7L11.15 9.95C9.9 8.85 9 8.05 9 7.1C9 6.3 9.65 5.6 10.5 5.6C11.05 5.6 11.6 5.9 12 6.35C12.4 5.9 12.95 5.6 13.5 5.6C14.35 5.6 15 6.3 15 7.1C15 8.05 14.1 8.85 12.85 9.95L12 10.7Z" stroke="black" stroke-width="0.7" fill="none"/> </svg>
              </div>
              <div>Looks like you haven't added anything to your wishlist yet.</div>
            </div>
          ) : (
            wishList?.map((mobile, ind) => (
              <a
                href={`/Mobile/${mobile.$id}`}
                target="_blank"
                key={ind}
                className="wishlistItem"
              >
                <div className="wishlistImageContainer">
                  <img src={mobile.ImageUrl} alt={mobile.Name} />
                </div>
                <div className="wishlistDetails">
                  <div className="mobileName">{mobile.Name}</div>
                  <div className="mobileRating">
                    <div className="ratingValue">{mobile.Rating}</div>
                    <span className='ratingStar' style={{display:'flex' , alignItems:'center'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="1" style={{marginTop:'5px'}}><path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"/></svg>
                    </span>
                  </div>
                  <div className="mobilePrice">&#8377;{mobile.Price.toLocaleString('en-IN')}</div>
                  <ul className="mobileHighlights">
                    {
                      mobile.Highlights.map((highl, ind) => (
                        <div key={ind} className="highlightItem">
                          <div className="bulletDot"></div>
                          <li>{highl}</li>
                        </div>
                      ))
                    }
                  </ul>
                </div>
              </a>
            ))
          )
        }
      </div>
    </div>

  )
}

export default Wishlist