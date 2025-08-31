import React from 'react'

function OrderPlacedPage() {
  return (
    <div style={{padding:'4.8rem 15% 0rem 15%'}} >
      <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center' , gap:'10px'}}>
        <div style={{width:'250px' , height:'300px'}}>
          <img src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/689340fa00295cb33589/view?project=6891a8f2001fdab5d3e5&mode=admin" alt="OrderPlaced" />
        </div>
        <div>
          <div>Your Order Placed Successfully</div>
        </div>
        <div style={{marginTop:'20px'}}>
          <a href="/Home">
            <button onClick={() => window.location.href = '/Home'} style={{padding:'15px 40px' , background:'none' , borderRadius:'10px' , color:'green' , border:'1px solid green' , fontWeight:'bold'}} >Home Page</button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default OrderPlacedPage