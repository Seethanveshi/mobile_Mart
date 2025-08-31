import React, { useEffect, useState } from 'react'
import databaseService from '../../Database/Database';
import { useSelector , useDispatch } from 'react-redux';
import { newArrival } from '../../ReduxtoolKit/Slice/HomeRedux';
import { useParams } from 'react-router-dom';

import '../../CSS/Mobiles.css'

function Mobiles() {

  const {category , categoryName} = useParams();

  const [MobileCategory  , setMobileCategoty] = useState([]);

  const data = useSelector(state => state.homeDataService);
  const Dispatch = useDispatch();

  useEffect(() => {
    const fetch = async() => {
        const Mobiles = await databaseService.getCategoryMobiles(categoryName , category);
        setMobileCategoty(Mobiles);
    }

    fetch();

  } , []);

  console.log(MobileCategory);

  return (
    <div className='mobiles' style={{padding:'4.8rem 15% 0rem 15%' , backgroundColor:'rgb(237, 237, 237'}}>
        <div>
          {
            MobileCategory?.map((mobile , ind) => (
              <a href= {`/Mobile/${mobile.$id}`} target='_blank' key={ind} style={{display:'flex' , borderBottom:'1px solid black' , backgroundColor:'white'}}>
                    <div style={{width:'200px' , height:'250px' , padding:'25px'}}>
                      <img src={mobile.ImageUrl} alt={mobile.Name} />
                    </div>
                    <div style={{paddingTop:'30px' , paddingLeft:'15px' , display:'flex' , flexDirection:'column' , gap:'5px'}}>
                        <div style={{display:'flex' , fontWeight:'bold' , fontSize:'20px'}}>{mobile.Name}</div>
                        <div  style={{display:'flex' , margin:'5px 0' , fontWeight:'bold' , fontSize:'20px' , backgroundColor:'green' , width:'50px' , color:'white' , gap:'3px'}}>
                          <div style={{marginLeft:'5px'}}>{mobile.Rating}</div>
                          <span style={{display:'flex' , alignItems:'center'}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="1" style={{marginTop:'8px'}}><path fill="#FFF" d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"/></svg></span>
                        </div>
                        <div style={{display:'flex' , fontWeight:'bold' , fontSize:'20px'}}>&#8377;{mobile.Price.toLocaleString('en-IN')}</div>
                        <ul style={{display:'flex' , flexDirection:'column' , paddingLeft:'0px' , gap:'8px'}}>
                          {
                            mobile.Highlights.map((highl , ind) => (
                              <div key={ind} style={{display:'flex' , alignItems:'center' , gap:'8px'}}>
                                <div style={{backgroundColor:'grey' , width:'5px' , height:'5px' , borderRadius:'50%'}}></div>
                                <li key={ind}  style={{ display:'flex'}}>{highl}</li>
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