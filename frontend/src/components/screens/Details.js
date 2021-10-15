

import { useState ,useEffect } from "react";
import axios from "axios";
import "./Details.css"; 

const Details = ({history,match}) => {

    useEffect(() => {
      const getUserDetails= async()=>{
        let {data} =   await axios.get(`/api/private/details/${match.params.user_id}`,config)
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
              dateOfBirth:data.dateOfBirth,
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
            
           
         }
     }
    
       getUserDetails()

      
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        setlat( position.coords.latitude) ;
        setlong(position.coords.longitude)
       });
       
    },[] )

    
    
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

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
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

       try {
       let {response} = await axios.post("/send-text",{"recipient":"+919428237534","textmessage":textmessage},config2)
       console.log(response)
       } catch (error) {
          console.log(error)
       }

  
        
  }
  
 
  return(

   <div className="container">
        <div className="row">
                <div className="col-sm-12 header">
                    <h1>One Nation One Health</h1>
                </div>
        </div>
        <div className="row ">
                <div className="col-sm-12 name">
                        <h2>Fullname</h2>
                        <h3>{fullname}</h3>
                </div>
        </div>
        <div className="row ">
                <div className="col-sm-12 name">
                        <button className="btn btn-danger" onClick={sendAlert}>Alert{" "+"Family Member"}</button>
                </div>
        </div>
   
   </div>

  )

};

export default Details;


