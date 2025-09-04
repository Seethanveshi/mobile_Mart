import React from 'react'
import '../../CSS/Footer.css'

function Footer() {
  return (
    <div className='FooterBlock' style={{backgroundColor:'rgb(37, 35, 35)'}}>
        <div style={{display:'flex' , justifyContent:'space-around' , height:'20rem' , alignItems:'center'}}>
            <div style={{display:'flex' , flexDirection:'column' , alignItems:'center'}}>
                <div style={{color:'grey' , margin:'1rem'}}>ABOUT</div>
                <div style = {{color:'white' , fontWeight:'bold' , display:'flex' , flexDirection:'column' , gap:'5px'}} className="about-block">
                    <div>Contact Us</div>
                    <div>About Us</div>
                    <div>Carrer</div>
                    <div>Corporate Information</div>
                </div>
            </div>
            <div style={{display:'flex' , flexDirection:'column' , alignItems:'center'}}>
                <div style={{color:'grey' , margin:'1rem'}}>SOCIAL MEDIA</div>
                <div style = {{color:'white' , fontWeight:'bold' , display:'flex' , flexDirection:'column' , gap:'5px'}} className="social-media-block">
                    <div>Instagram</div>
                    <div>Twitter</div>
                    <div>Facebook</div>
                </div>
            </div>
            <div style={{display:'flex' , flexDirection:'column' , alignItems:'center'}}>
                <div style={{color:'grey' , margin:'1rem'}}>HELP</div>
                <div style = {{color:'white' , fontWeight:'bold' , display:'flex' , flexDirection:'column' , gap:'5px'}} className="help-block">
                    <div>Help Center</div>
                    <div>Inquery</div>
                    <div>Chat with Us</div>
                </div>
            </div>
            <div style={{display:'flex' , flexDirection:'column' , alignItems:'center'}}>
                <div style={{color:'grey' , margin:'1rem'}}>CONSUMER POLICY</div>
                <div style = {{color:'white' , fontWeight:'bold' , display:'flex' , flexDirection:'column' , gap:'5px'}} className="consumer-policy-block">
                    <div>Privacy</div>
                    <div>Security</div>
                    <div>Terms of Use</div>
                    <div>Terms and Conditions</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer