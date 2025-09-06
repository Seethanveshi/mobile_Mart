import React from 'react'
import '../../CSS/OrderPlacedPage.css'

function OrderPlacedPage() {
  return (
    <div className="orderPlacedPage">
      <div className="content">
        <div className="imageWrapper">
          <img
            src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/689340fa00295cb33589/view?project=6891a8f2001fdab5d3e5&mode=admin"
            alt="OrderPlaced"
          />
        </div>
        <div>
          <div>Your Order Placed Successfully</div>
        </div>
        <div className="buttonWrapper">
          <a href="/Home">
            <button
              onClick={() => (window.location.href = '/Home')}
              className="homeButton"
            >
              Home Page
            </button>
          </a>
        </div>
      </div>
    </div>

  )
}

export default OrderPlacedPage