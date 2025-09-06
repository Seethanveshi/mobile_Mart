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
        <div className="addressPage">
            <div>
                <div className="addressSection">
                <div className="addressListWrapper">
                    <div className="addressList">
                    {
                        savedAddress?.map((add, ind) => (
                        <div className="addressCard" key={ind}>
                            <div className="addressRadioGroup">
                            <input
                                className="addressRadio"
                                id={`address-${ind}`}
                                type="radio"
                                name="address"
                                value={add.$id}
                                checked={selectedAddress === add.$id}
                                onChange={(e) => setSelectedAddress(e.target.value)}
                            />
                            <label htmlFor={`address-${ind}`} className="addressLabel">
                                <div className="addressName">{add.Name} | {add.MobileNumber}</div>
                                <div className="addressDetails">
                                {add.Address}, {add.LandMark}, {add.City}, {add.District}, {add.State}, India, {add.Pincode}
                                </div>
                            </label>
                            <button onClick={() => deleteAddress(add.$id)} className="deleteButton">Delete</button>
                            </div>
                            <div className={`deliveryButton ${selectedAddress === add.$id ? 'active' : ''}`}>
                                <button onClick={() => deliveryAddress(add)} className="deliveryHereButton">Delivery Here</button>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </div>
                <form className="addressForm" onSubmit={addressHandler}>
                    <div className="formContent">
                        <div className='newAddressName'>NEW ADDRESS</div>
                        <div className="sectionTitle">Contact Details</div>
                        <div className="inputGroup">
                            <InputBox value={Name} onValueChange={setName} type="text" className="InputField" placeHolder="Full Name*" />
                            <InputBox value={Number} onValueChange={setNumber} type="number" className="InputField" placeHolder="Mobile Number*" />
                        </div>
                        <div className="sectionTitle">Address</div>
                        <div className="textareaWrapper">
                            <textarea className="InputField textarea" value={Address} onChange={(e) => setAddress(e.target.value)} placeholder="HOUSE No, Building Name, Street"></textarea>
                        </div>
                        <div className="inputGroup">
                            <InputBox value={City} onValueChange={setCity} type="text" className="InputField" placeHolder="Town/City*" />
                            <InputBox value={LandMark} onValueChange={setLandMark} type="text" className="InputField" placeHolder="LandMark*" />
                        </div>
                        <div className="dropdownGroup">
                            <select name="states" className="InputField" onChange={(e) => { setState(e.target.value), setDistrict('') }} required>
                            <option value="">Select State</option>
                            {
                                states.map((st) => (
                                <option key={st} value={st}>{st}</option>
                                ))
                            }
                            </select>
                            <select name="districts" className="InputField" disabled={!State} onChange={(e) => setDistrict(e.target.value)} required>
                            <option value="">Select District</option>
                            {
                                states_districts[State]?.map((dis) => (
                                <option key={dis} value={dis}>{dis}</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className="pincodeWrapper">
                            <InputBox value={PinCode} onValueChange={setPinCode} type="number" className="InputField" placeHolder="PinCode*" />
                        </div>
                        <div>
                            <button className="submitButton" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>

    )
}

export default Address