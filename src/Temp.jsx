import React, { useRef } from 'react';
import "./index.css"
import { getAllData } from './JavaScript/JavaScript';


const NewArrivals = () => {

  return (
    <div style={{ padding: '20rem' }}>
      <button onClick={() => {getAllData()}}>Click Here</button>
    </div>

  );
};

export default NewArrivals;
