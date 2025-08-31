import React, { useEffect, useState } from 'react'
import InputBox from '../InputBox/InputBox';
import '../../CSS/Address.css'
import { states , states_districts } from '../../JavaScript/JavaScript';
import databaseService from '../../Database/Database';
import { useNavigate } from 'react-router-dom';

function Address() {

    const navigate = useNavigate();
    const add = JSON.parse((localStorage.getItem('deliveryAdd'))) || {};

    const [Name , setName] = useState('');
    const [Number , setNumber] = useState();
    const [Address , setAddress] = useState('');
    const [City , setCity] = useState('');
    const [LandMark , setLandMark] = useState('');
    const [State , setState] = useState('');
    const [District , setDistrict] = useState('');
    const [PinCode , setPinCode] = useState();

    const [savedAddress , setSavedAddress] = useState();
    const [selectedAddress , setSelectedAddress] = useState(); 

    useEffect(() => {
        getSavedAddress();
    } , [])

    const getSavedAddress = async() => {
        const address = await databaseService.getAllAddresses();
        setSavedAddress(address);
    }

    const addressHandler = async(e) => {
        e.preventDefault();
        const AddressObj = {
            Name : Name,
            MobileNumber : String(Number),
            Address : Address,
            City : City,
            LandMark : LandMark,
            State : State,
            District : District,
            Pincode : String(PinCode)
        }
        
        let update = savedAddress;
        update = [...update , AddressObj];
        setSavedAddress(update);
        await databaseService.addAddress(AddressObj);
        getSavedAddress();

        setName('');
        setNumber('');
        setAddress('');
        setCity('');
        setDistrict('');
        setLandMark('');
        setState('');
        setPinCode('');
    }

    const deleteAddress = (Id) => {
        setSavedAddress(prev => prev.filter(add => add.$id !== Id));
        databaseService.deleteAddress(Id)
    }

    const deliveryAddress = (add) => {
        localStorage.setItem('deliveryAdd' , JSON.stringify(add));
        navigate('/Payment');
    }

    return (
        <div style={{padding:'5.3rem 20% 5rem 20%' , backgroundColor:'white' , height:'100%'}}>
            <div>
                <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center' , width:'100%' , gap:'10px'}}>
                    <div style={{width:'60%'}}>
                        <div style={{display:'flex' , flexDirection:'column' , gap:'10px'}}>
                            {
                                savedAddress?.map((add , ind) => (
                                    <div style={{display:'flex' , flexDirection:'column' , border:'1px solid black' , padding:'15px 20px'}} key={ind}>
                                        <div style={{display:'flex'}}>
                                            <input  style={{display:'flex' , width:'15px' , height:'20px' ,margin:'0px'}}
                                                id={`address-${ind}`}
                                                type="radio"
                                                name="address"
                                                value={add.$id}
                                                checked={selectedAddress === add.$id}
                                                onChange={(e) => setSelectedAddress(e.target.value)} 
                                            />
                                            <label htmlFor={`address-${ind}`}> 
                                                <div style={{display:'flex' , marginLeft:'8px' , width:'250px' , maxWidth:'100%'}}>{add.Name} | {add.MobileNumber}</div>
                                                <div style={{display:'flex' , color:'grey' , textAlign:'start' , margin:'5px 0px 0px 8px '}}>
                                                    {add.Address}, {add.LandMark}, {add.City}, {add.District}, {add.State}, India, {add.Pincode}
                                                </div>
                                            </label>
                                            <button onClick={() => deleteAddress(add.$id)} style={{display:'flex' , border:'none' , background:'none' , height:'20px'}}>Delete</button>
                                        </div>
                                        <div className={`deliveryButton ${selectedAddress === add.$id ? 'active' : ''}`}>
                                            <button onClick={() => deliveryAddress(add)} style={{display:'flex' ,padding:'15px 10px' , backgroundColor:'green' , border:'none' , color:'white' , borderRadius:'5px'}}>Delivery Here</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <form style={{width:'60%'}} onSubmit={addressHandler}>
                        <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , gap:'10px' , width:'100%' , border:'1px solid black' , padding:'15px', boxSizing:'border-box'}}>
                            <div>NEW ADDRESS</div>
                            <div style={{fontSize:'16px'}}>Contact Details</div>
                            <div style={{display:'flex' , flexDirection:'column' , gap:'8px' , width:'80%' , justifyContent:'center'}}>
                                <InputBox value={Name} onValueChange={setName} type="text" className = 'InputField' placeHolder='Full Name*' />
                                <InputBox value={Number} onValueChange={setNumber} type="number" className = 'InputField' placeHolder='Mobile Number*' />
                            </div>
                            <div style={{fontSize:'18px'}}>Address</div>
                            <div style={{width:'80%'}}>
                                <textarea style={{fontSize:'16px'}} className='InputField' value={Address} onChange={(e) => setAddress(e.target.value)} placeholder='HOUSE No, Building Name, Street'></textarea>
                            </div>
                            <div style={{display:'flex' , flexDirection:'column' , gap:'8px' , width:'80%'}}>
                                <InputBox value={City} onValueChange={setCity} type="text" className = 'InputField' placeHolder='Town/City*' />
                                <InputBox value={LandMark} onValueChange={setLandMark} type="text" className = 'InputField' placeHolder='LandMark*' />
                            </div>
                            <div style={{display:'flex' , justifyContent:'center' , gap:'8px' , width:'80%'}}>
                                <select name="states" className='InputField' onChange={(e) => {setState(e.target.value) , setDistrict('')}} required>
                                    <option value="">Select State</option>
                                    {
                                        states.map((st) => (
                                            <option key={st} value={st}>{st}</option>
                                        ))
                                    }
                                </select>
                                <select name="districts" className='InputField' disabled={!State} onChange={(e) => setDistrict(e.target.value)} required>
                                    <option value="">Select District</option>
                                    {
                                        states_districts[State]?.map((dis) => (
                                            <option key={dis} value={dis}>{dis}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div style={{width:'80%'}}>
                                <InputBox value={PinCode} onValueChange={setPinCode} type="number" className = 'InputField' placeHolder='PinCode*' />
                            </div>
                            <div>
                                <button style={{backgroundColor:'green' , color:'white' , border:'none' , padding:'15px 20px' , fontSize:'16px' , fontWeight:'bold' , borderRadius:'5px'}} type='submit'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Address