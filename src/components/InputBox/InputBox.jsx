import React from 'react'
import { useState } from 'react';

function InputBox({value='' , onValueChange , type='text' , className='' , placeHolder='Enter'}) {

  return (
    <>
        <div>
            <input
                className={className} 
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={(e) => {onValueChange(e.target.value)}}
                required  
                />
        </div>
    </>
  )
}

export default InputBox