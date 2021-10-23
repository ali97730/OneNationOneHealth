

import { useState ,useEffect } from "react";
import { toast,ToastContainer } from "react-toastify";
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import PhoneForwardedRoundedIcon from '@mui/icons-material/PhoneForwardedRounded';
import LocalPoliceRoundedIcon from '@mui/icons-material/LocalPoliceRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import { Button, Form, FormGroup, Label, Input,InputGroup, InputGroupAddon, InputGroupText,FormFeedback, CustomInput,
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import "./Details.css"; 
const Details = ({history,match}) => {

    useEffect(() => {
      const getUserDetails= async()=>{
        let {data} =   await axios.get(`/api/private/emergency/${match.params.user_id}`,config2)
          console.log(data)
         if(data.user){
            setData({
              fullname:data.fullname,
              contactNumber:data.contactNumber,
              address:data.address,
              city:data.city,
              state:data.state,
              pincode:data.pincode,
              gender:data.gender,
              dateOfBirth:new Date(data.dateOfBirth).toISOString().split("T")[0],
              emergencyPhoneNumber:data.emergencyPhoneNumber,
              bloodGroup:data.bloodGroup,
              familyDoctorNumber:data.familyDoctorNumber,
              anyDisability:data.anyDisability,
              severeDisease:data.severeDisease,
              donor:data.donor,
              age:data.age,
              image:data.images,
              userId:data.user,
              items:data.items
            })
            
           
         }else{
           history.push("./login")
         }
     }
    
       getUserDetails()

      
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        setlat( position.coords.latitude) ;
        setlong(position.coords.longitude)
       });
       
    },[] )// eslint-disable-line react-hooks/exhaustive-deps

    
  const [data,setData] = useState({
    fullname:"",
    contactNumber:"",
    address:"",
    city:"",
    state:"",
    pincode:"",
    gender:"male",
    dateOfBirth:"",
    emergencyPhoneNumber:"",
    bloodGroup:"A+",
    familyDoctorNumber:"",
    anyDisability:"",
    severeDisease:"",
    donor:"",
    age:"",
    image:[],
    userId:"",
    items:null
  })
 
 const [lat,setlat] = useState("")
 const [long,setlong] = useState("")

  // const config = {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  //   },
  // };
  const config2 = {
    headers: {
      "Content-Type": "application/json",
      
    },
  };
 
 
  const {
    fullname,
    contactNumber,
    age,
    address,
    city,
    state,
    pincode,
    gender,
    dateOfBirth,
    emergencyPhoneNumber,
    bloodGroup,
    familyDoctorNumber,
    anyDisability,
    severeDisease,
    donor,
  } = data
  const [otp,setOtp] = useState(Math.floor(Math.random()*1000000))
  const [verifyotp,setVerifyotp] = useState()
console.log(verifyotp)

  

  const sendOtp = async()=>{
    await axios.post("/send-text",{"recipient":`+919054296234`,"textmessage":`Otp For Emergency Login : ${otp}`},config2)
       .then((res)=>(toast("OTP Sent",{type:"success"})))
       .catch(err => toast("OTP Not sent",{type:"error"}) )
  }

  const verifyOtp = ()=>{
    if(otp.toString() === verifyotp){
      console.log("verified")
      history.push(`./emergencylogin/${match.params.user_id}`)
    }else{
      console.log("not verified")
      toast("OTP Not Valid",{type:"error"})
    }
  }

  const sendAlert = async() =>{


      var location ="";
    if(lat && long ){
     location = `http://maps.google.com/maps?z=12&t=m&q=loc:${lat},${long}`

    }

   console.log(location)

    const textmessage = `
    ${fullname} has sent ALert to You 
    Please Contact Him He Might need your Help
     his LOCATION: ${location}
  `;

     
       await axios.post("/send-text",{"recipient":`+919428237534`,"textmessage":textmessage},config2)
       .then((res)=>(toast("Alert Sent",{type:"success"})))
       .catch(err => toast("Alert Not sent",{type:"error"}) )
        
      

 }
  
 
  return(

   <div className="container">
      <ToastContainer/>
        <div className="row">
                <div className="col-sm-12 header">
                    <h1>One Nation One Health</h1>
                   
                </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Call police</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1">
            <button className="btn btn-danger" >
            <a href={`tel:100`} style={{textDecoration:"none"}}><span><LocalPoliceRoundedIcon/></span> click to call</a>

            </button>

            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Call Ambulance</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1">
            <button className="btn btn-danger" >
            <a href={`tel:102`} style={{textDecoration:"none"}}><span><LocalHospitalRoundedIcon/></span> click to call</a>

            </button>

            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Family Member</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1">
            <button className="btn btn-danger" onClick={sendAlert}>
            <span><AddLocationAltRoundedIcon/></span>Send Alert

            </button>

            </div>
        </div>

        <div className="row field">
             <div className="col-4">
                <h2>Fullname</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{fullname}</h3>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Age</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{age}</h3>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Donor</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{donor?donor:"No"}</h3>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Blood Group</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{bloodGroup}</h3>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Disability</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{anyDisability?anyDisability:"No"}</h3>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>severe Disease</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{severeDisease?severeDisease:"No"}</h3>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Emergency Contact</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{`+91${emergencyPhoneNumber}`}</h3>
               <a href={`tel:+91${emergencyPhoneNumber}`}><span><PhoneForwardedRoundedIcon/></span> click to call</a>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Family Doctor</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{`+91${familyDoctorNumber}`}</h3>
               <a href={`tel:+91${familyDoctorNumber}`}><span><PhoneForwardedRoundedIcon/></span> click to call</a>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>Date of Birth</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{dateOfBirth}</h3>
                <span>year-month-day</span>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>City</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{city}</h3>
            </div>
        </div>
        <div className="row field">
             <div className="col-4">
                <h2>State</h2>
            </div>
            <div className="col-1">
              <h2><DoubleArrowRoundedIcon/></h2>
            </div>
            <div className="col-6 offset-1 value">
                <h3>{state}</h3>
            </div>
        </div>
        <div className="row field">
             <div className="col-8 offset-3">
                <button className="btn btn-primary" onClick={sendOtp} >EmergencyLogin</button>
            </div>            
        </div>

        <div className="row field">
             <h3>enter verification code</h3>
            <input value={verifyotp} onChange={(e)=>setVerifyotp(e.target.value)}></input> 
            <button className="btn btn-success " onClick={verifyOtp}>Verify and Login</button>       
        </div>


   
   </div>

  )

};

export default Details;


