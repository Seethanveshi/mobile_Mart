import React from 'react'
import '../../CSS/Header.css'
import { useNavigate } from 'react-router-dom';

function NormalHeader() {

  const navigate = useNavigate();

  return (
    <header className="header">
      <nav style={{width:'100%'}} className="nav">
        <ul className="NavBar">

          <li className="NavItemStart">
            <div className="mobileMartLogo">
              <img onClick={() => navigate('/Home')} style={{marginTop:'5px' , width:'180px'}}
                src="https://nyc.cloud.appwrite.io/v1/storage/buckets/6891ab870006c0711f88/files/6893410e000c0818b113/view?project=6891a8f2001fdab5d3e5&mode=admin"
                alt="MobileMart Logo"
                title="MobileMart Logo"
              />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NormalHeader