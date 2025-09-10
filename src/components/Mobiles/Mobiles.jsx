import React, { useEffect, useState } from 'react'
import databaseService from '../../Database/Database';
import { useSelector , useDispatch } from 'react-redux';
import { newArrival } from '../../ReduxtoolKit/Slice/HomeRedux';
import { useParams } from 'react-router-dom';
import '../../CSS/Mobiles.css'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Mobiles() {

  const {category , categoryName} = useParams();

  const [MobileCategory  , setMobileCategoty] = useState([]);
  const [Loading , setLoading] = useState(false);

  const data = useSelector(state => state.homeDataService);
  const Dispatch = useDispatch();

  useEffect(() => {
    const fetch = async() => {
        setLoading(true);
        const Mobiles = await databaseService.getCategoryMobiles(categoryName , category);
        setLoading(false);
        setMobileCategoty(Mobiles);
    }

    fetch();

  } , []);

  if(Loading) return <LoadingSpinner />

  return (
    <div className="mobiles">
      <div>
        {
          MobileCategory?.map((mobile, ind) => (
            <a
              href={`/Mobile/${mobile.$id}`}
              target="_blank"
              key={ind}
              className="MobileItem"
            >
              <div className="mobileImageContainer">
                <img src={mobile.ImageUrl} alt={mobile.Name} />
              </div>
              <div className="mobileDetails">
                <div className="mobileName">{mobile.Name}</div>
                <div className="mobileRating">
                  <div className="ratingValue">{mobile.Rating}</div>
                  <span className='ratingStar' style={{display:'flex' , alignItems:'center'}}>
                      <svg className='starImage' xmlns="http://www.w3.org/2000/svg" width="20" height="1"><path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"/></svg>
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
        }
      </div>
    </div>

  )
}

export default Mobiles