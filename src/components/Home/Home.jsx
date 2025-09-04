import React, { useEffect, useState } from 'react'
import ImageSlider from '../ImageSlider/ImageSlider'
import databaseService from '../../Database/Database'
import '../../CSS/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { flagShip, newArrival , midRange , budget } from '../../ReduxtoolKit/Slice/HomeRedux'
import { NavLink } from 'react-router-dom'
import authService from '../../Auth/Auth'
import Footer from '../Footer/Footer'

function Home() {

    const [newArrivals , setNewArrivals] = useState([]);
    const [flagShips , setFlagShips] = useState([]);
    const [midRanges , setMidRanges] = useState([]);
    const [budgets , setBudgets] = useState([]);

    const [newArrivalTranslate , setNewArrivalTranslate] = useState(0);
    const [flagShipTranslate , setflagShipTranslate] = useState(0);
    const [midRangeTranslate , setMidRangeTranslate] = useState(0);
    const [budgetTranslate , setBudgetTranslate] = useState(0);


    const ITEMS_VISIBLE = 6;
    const TRANSLATE_STEP = 100 / ITEMS_VISIBLE;

    const handlePrev = (translate, setTranslate) => {
        setTranslate(prev => Math.min(prev + TRANSLATE_STEP, 0));
    };

    const handleNext = (translate, setTranslate, array) => {
        const maxTranslate = -((array.length - ITEMS_VISIBLE) * TRANSLATE_STEP);
        setTranslate(prev => Math.max(prev - TRANSLATE_STEP, maxTranslate));
    };

    useEffect(() => {
        const fetchHomeData = async() =>{

            const newArrivalData = await databaseService.getCategoryMobiles('Category' , 'newArrival');
            setNewArrivals(newArrivalData);
            const flagShipData = await databaseService.getCategoryMobiles('Category' , 'flagShip');
            setFlagShips(flagShipData);

            const midRangeData = await databaseService.getCategoryMobiles('Category' , 'midRange');
            setMidRanges(midRangeData);

            const budgetData = await databaseService.getCategoryMobiles('Category' , 'budget');
            setBudgets(budgetData);
        }

        fetchHomeData();

    } , []);

  return (
    <>
    
        <div>
            <ImageSlider />
        </div>

        <div className='gridContainer'>
            <div className='grid'>
                <a href='/Mobiles/Brand/Samsung'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/6894405a00067adc1fd5/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Samsung" 
                    />
                    <div className='mobileToolKit'>Samsung Mobiles</div>
                </a>
            </div>
            <div className='grid'>
                <a href='/Mobiles/Brand/Realme'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933fd5003b26ca0961/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Realme" 
                    />
                    <div className='mobileToolKit'>Realme Mobiles</div>
                </a>
            </div>
            <div className='grid'>
                <a href='/Mobiles/Brand/Poco'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933f9b0008422db164/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Poco" 
                    />
                    <div className='mobileToolKit'>Poco Mobiles</div>
                </a>
            </div>
            <div className='grid'>
                <a href='/Mobiles/Brand/Moto'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933f2b002cad8048f5/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Moto" 
                    />
                    <div className='mobileToolKit'>Moto Mobiles</div>
                </a>
            </div>
            <div className='grid'>
                <a href='/Mobiles/Brand/Redmi'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/6893401a001bfb8d1106/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Redmi" 
                    />
                    <div className='mobileToolKit'>Redmi Mobiles</div>
                </a>
            </div>
            <div className='grid'>
                <a href='/Mobiles/Brand/Oppo'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933f7f003d93d029f1/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Oppo" 
                    />
                    <div className='mobileToolKit'>Oppo Mobiles</div>
                </a>
            </div>
            <div className='grid'>
                <a href='/Mobiles/Brand/Apple'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933e63002f6fefc493/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Iphone" 
                    />
                    <div className='mobileToolKit'>Iphone Mobiles</div>
                </a>
            </div>
            <div className='grid'>
                <a href='/Mobiles/Brand/Nothing'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933684000e0d103cff/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Nothing" 
                    />
                    <div className='mobileToolKit'>Nothing Mobiles</div>
                </a>
            </div>
             <div className='grid'>
                <a href='/Mobiles/Brand/Oneplus'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933f620036f5cece12/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Oneplus" 
                    />
                    <div className='mobileToolKit'>Oneplus Mobiles</div>
                </a>
            </div>
             <div className='grid'>
                <a href='/Mobiles/Brand/Vivo'>
                    <img 
                        src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/689340910010c391a7a5/view?project=6891a8f2001fdab5d3e5&mode=admin" 
                        alt="Vivo" 
                    />
                    <div className='mobileToolKit'>Vivo Mobiles</div>
                </a>
            </div>
        </div>


        <div className='categoryBlock'>
            <div className='categoryHeading'>New Arrival Mobiles</div>
            <div className='products'>
                <div
                    style={{display:'flex' , transform:`translateX(${newArrivalTranslate}%)` , transition : 'transform 0.2s linear'}}>
                    {
                        newArrivals?.map((product , ind) => (
                            <a key={ind} className='singleProduct' href={`/Mobile/${product.$id}`} target='_blank'>
                                <div className='SingleProductIma'>
                                    <img src={product.ImageUrl} alt={product.Name} />
                                </div>
                                <div>{product.Name}</div>
                                <div style={{fontWeight:'bold'}}>&#8377;{product.Price.toLocaleString("en-IN")}</div>
                            </a>
                        ))
                    }
                    <div style={{display:'flex' , alignItems:'center'}}>
                        <a href='/Mobiles/Category/newArrival'>
                            <button style={{height:'80px' , minWidth:'80px' , borderRadius:'50%'}}>See All</button>
                        </a>
                    </div>
                </div>
                <button onClick={() => {handlePrev(newArrivalTranslate , setNewArrivalTranslate)}} className='prevButton'>&#10094;</button>
                <button onClick={() => {handleNext(newArrivalTranslate , setNewArrivalTranslate , newArrivals)}} className='nextButton'>&#10095;</button>
            </div>
        </div>


        <div className='categoryBlock'>
            <div className='categoryHeading'>FlagShip Mobiles</div>
            <div className='products'>
                <div
                    style={{display:'flex' , transform:`translateX(${flagShipTranslate}%)` , transition : 'transform 0.2s linear'}}>
                    {
                        flagShips?.map((product , ind) => (
                            <a key={ind} className='singleProduct' href={`/Mobile/${product.$id}`} target='_blank'>
                                <div className='SingleProductIma'>
                                    <img src={product.ImageUrl} alt={product.Name} />
                                </div>
                                <div>{product.Name}</div>
                                <div style={{fontWeight:'bold'}}>&#8377;{product.Price.toLocaleString("en-IN")}</div>
                            </a>
                        ))
                    }
                    <div style={{display:'flex' , alignItems:'center'}}>
                        <a href='/Mobiles/Category/flagShip'>
                            <button style={{height:'80px' , minWidth:'80px' , borderRadius:'50%'}}>See All</button>
                        </a>
                    </div>
                </div>
                <button onClick={() => {handlePrev(flagShipTranslate , setflagShipTranslate)}} className='prevButton'>&#10094;</button>
                <button onClick={() => {handleNext(flagShipTranslate , setflagShipTranslate , flagShips)}} className='nextButton'>&#10095;</button>
            </div>
        </div>

        <div className='categoryBlock'>
            <div className='categoryHeading'>MidRange Mobiles</div>
            <div className='products'>
                <div
                    style={{display:'flex' , transform:`translateX(${midRangeTranslate}%)` , transition : 'transform 0.2s linear'}}>
                    {
                        midRanges?.map((product , ind) => (
                            <a key={ind} className='singleProduct' href={`/Mobile/${product.$id}`} target='_blank'>
                                <div className='SingleProductIma'>
                                    <img src={product.ImageUrl} alt={product.Name} />
                                </div>
                                <div>{product.Name}</div>
                                <div style={{fontWeight:'bold'}}>&#8377;{product.Price.toLocaleString("en-IN")}</div>
                            </a>
                        ))
                    }
                    <div style={{display:'flex' , alignItems:'center'}}>
                        <a href='/Mobiles/Category/midRange'>
                            <button style={{height:'80px' , minWidth:'80px' , borderRadius:'50%'}}>See All</button>
                        </a>
                    </div>
                </div>
                <button onClick={() => {handlePrev(midRangeTranslate , setMidRangeTranslate)}} className='prevButton'>&#10094;</button>
                <button onClick={() => {handleNext(midRangeTranslate , setMidRangeTranslate , midRanges)}} className='nextButton'>&#10095;</button>
            </div>
        </div>

        <div className='categoryBlock'>
            <div className='categoryHeading'>Budget Mobiles</div>
            <div className='products'>
                <div
                    style={{display:'flex' , transform:`translateX(${budgetTranslate}%)` , transition : 'transform 0.2s linear'}}>
                    {
                        budgets?.map((product , ind) => (
                            <a key={ind} className='singleProduct' href={`/Mobile/${product.$id}`} target='_blank'>
                                <div className='SingleProductIma'>
                                    <img src={product.ImageUrl} alt={product.Name} />
                                </div>
                                <div>{product.Name}</div>
                                <div style={{fontWeight:'bold'}}>&#8377;{product.Price.toLocaleString("en-IN")}</div>
                            </a>
                        ))
                    }
                    <div style={{display:'flex' , alignItems:'center'}}>
                        <a href='/Mobiles/Category/budget'>
                            <button style={{height:'80px' , minWidth:'80px' , borderRadius:'50%'}}>See All</button>
                        </a>
                    </div>
                </div>
                <button onClick={() => {handlePrev(budgetTranslate , setBudgetTranslate)}} className='prevButton'>&#10094;</button>
                <button onClick={() => {handleNext(budgetTranslate , setBudgetTranslate , budgets)}} className='nextButton'>&#10095;</button>
            </div>
        </div>
        <div>
            <Footer />
        </div>
    </>
  )
}

export default Home;