import React from 'react'
import { useEffect , useState , useRef } from 'react';
import '../../CSS/ImageSlider.css'
import { useNavigate } from 'react-router-dom';

function ImageSlider() {

    const navigate = useNavigate();

    const [num , setnum] = useState(0);
    const intervalRef = useRef(null);

    const Images = [
        {
            id : '6894c9c7002878019f3c',
            src:"https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933e9100215fdccfb9/view?project=6891a8f2001fdab5d3e5&mode=admin" ,
            alt:"Nothing Mobile"
        },
        {
            id : '6894c9f600386bca03f0',
            src:"https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68a80f0d00238b18f1eb/view?project=6891a8f2001fdab5d3e5&mode=admin", 
            alt:"Oneplus Mobile"
        },
        {
            id : '6894c9b6001d7b4696e4',
            src:"https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/68933e7d00264bac2e38/view?project=6891a8f2001fdab5d3e5&mode=admin", 
            alt:"Iphone Mobile"
        }
    ]

    const sliderStart = () => {
        if(intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setnum((prev) => (prev+1)%(Images.length))
        }, 3000);
    }

    useEffect(() => {
        sliderStart();
        return () => clearInterval(intervalRef.current);
    } , [])


  return (
    <div style={{position:'relative' , width:'100%' , marginTop:'5rem'}}>
        <div style={{width:'100%' , overflow:'hidden'}}>
            <div style={{transform:`translateX(${-(num*100)}%)`}} className='imageSlider'>
                {
                    Images.map((pro , ind)=> (
                        <img onClick={() => navigate(`/Mobile/${pro.id}`)} key={ind} src={pro.src} alt={pro.alt} />
                    ))
                }
            </div>
        </div>

        <button onClick={()=> {setnum((prev)=> (prev<=0 ? Images.length-1 : prev-1)) , sliderStart()}} className='slider-btn prev'>&#10094;</button>
        <button onClick={()=> {setnum((prev)=> ((prev+1)%(Images.length))) , sliderStart()}} className='slider-btn next'>&#10095;</button>
        
        <div className='dotsContainer'>
            {
            Images.map((_,i) => (
                <span key={i}
                    className= {`dot ${num==i ? 'active' : ''} `}
                    onClick={() => {setnum(i) , sliderStart()}}    
                />
            ))
            }
        </div>

    </div>
  )
}

export default ImageSlider