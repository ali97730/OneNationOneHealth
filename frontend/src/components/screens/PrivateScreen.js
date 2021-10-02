

import { useState ,useEffect, Fragment} from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input,Col ,Row, FormText} from 'reactstrap';
import { saveAs } from 'file-saver'



const PrivateScreen = ({history,match}) => {

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
              userId:data.user
            })
            
            setImg(data.images)
         }
     }
    
       getUserDetails()
    },[] )


  const [data,setData] = useState({
    fullname:"",
    contactNumber:"",
    address:"",
    city:"",
    state:"",
    pincode:"",
    gender:"",
    dateOfBirth:"",
    emergencyPhoneNumber:"",
    bloodGroup:"",
    familyDoctorNumber:"",
    anyDisability:"",
    severeDisease:"",
    donor:"",
    age:"",
    image:[],
    userId:""
  })
  const [img,setImg] = useState([])

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
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
 
  var formData = new FormData();
  const handleChange=name=>event=>{
    

    if(name ==="image"){
      let arr = Array.from(event.target.files)
      setData({...data,image:arr})
    }else{
      const value = event.target.value
      setData({...data,[name]:value})
    }

}
  
  const submitHandler = async (e)=>{
    e.preventDefault()
  try {
    formData.set("fullname",fullname)
    formData.set("contactNumber",contactNumber)
    formData.set("age",age)
    formData.set("address", address)
    formData.set("city",city)
    formData.set("state",state)
    formData.set("pincode",pincode)
    formData.set("gender",gender)
    formData.set("dateOfBirth",dateOfBirth)
    formData.set("emergencyPhoneNumber",emergencyPhoneNumber)
    formData.set("bloodGroup",bloodGroup)
    formData.set("familyDoctorNumber",familyDoctorNumber)
    formData.set("anyDisability",anyDisability)
    formData.set("severeDisease",severeDisease)
    formData.set("donor",donor)
  
    if(data.image){
      for(var i=0;i<data.image.length;i++){
        formData.append("image",data.image[i])
      } 
    }
    if(!data.userId){
    
      await axios.post(`/api/private/details/${match.params.user_id}`,formData,config).then(
        (response)=>{
            console.log(response)
            history.push(`/details/certificate/${match.params.user_id}`)
          }
      ).catch((err)=>{
        console.log(err)
      })
    }else{

      await axios.put(`/api/private/details/${match.params.user_id}`,formData,config).then(
        (response)=>{
            console.log(response)
            history.push(`/details/certificate/${data.userId}`)
        }
      ).catch((err)=>{
        history.push("/")
      })

    }

  } catch (error) {
    
    console.log(error)
    history.push("/")
  }
  
}

  return(

    <Row>

      <Col md={7}>
      <Form>
      <h1> Personal Details</h1>
      <FormGroup>
        <Label for="fullname">Fullname</Label>
        <Input type="text" name="fullname" id="fullname"   value={fullname}  onChange={handleChange("fullname")} placeholder="Enter Your Fullname" />
      </FormGroup>
       <FormGroup>
        <Label for="contactNumber">Contact Number</Label>
        <Input type="number" name="contactNumber" id="contactNumber" value={contactNumber} onChange={handleChange("contactNumber")} placeholder="Enter Your Contact Number" />
      </FormGroup>
      <FormGroup>
        <Label for="age">Enter Your Age</Label>
        <Input type="text" name="age" id="age" value={age} onChange={handleChange("age")} placeholder="Enter Your age" />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input type="text" name="address" id="address" value={address} onChange={handleChange("address")} placeholder="Enter Your Address" />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input type="text" name="city" id="city" value={city} onChange={handleChange("city")} placeholder="Enter city" />
      </FormGroup>
      <FormGroup>
        <Label for="state">State</Label>
        <Input type="text" name="state" id="state" value={state} onChange={handleChange("state")} placeholder="Enter state" />
      </FormGroup>
      <FormGroup>
        <Label for="pincode">Pincode</Label>
        <Input type="number" name="pincode" id="pincode" value={pincode} onChange={handleChange("pincode")} placeholder="Enter Your pincode" />
      </FormGroup>
      <FormGroup row>
        <Label for="gender" >Select Gender</Label>
        <Col >
          <Input type="select" name="gender" value={gender} onChange={handleChange("gender")}  id="gender">
            <option selected value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
            </Input>
        </Col>
      </FormGroup>
      <FormGroup>
        <Label for="dateOfBirth">DOB</Label>
        <Input type="date" name="dateOfBirth" id="dateOfBirth" value={dateOfBirth} onChange={handleChange("dateOfBirth")} placeholder="Date Of Birth" />
      </FormGroup>
      <h1> Medical Details</h1>

      <FormGroup>
        <Label for="emergencyPhoneNumber">Emergency Contact Number</Label>
        <Input type="number" name="emergencyPhoneNumber" id="emergencyPhoneNumber" value={emergencyPhoneNumber} onChange={handleChange("emergencyPhoneNumber")} placeholder="Enter Emergency Contact Number" />
      </FormGroup>
      <FormGroup>
        <Label for="bloodGroup">Blood Group</Label>
        <Input type="text" name="bloodGroup" id="bloodGroup" value={bloodGroup} onChange={handleChange("bloodGroup")} placeholder="Enter Blood Group" />
      </FormGroup>
      <FormGroup>
        <Label for="familyDoctorNumber">Family Doctor Number</Label>
        <Input type="number" name="familyDoctorNumber" id="familyDoctorNumber" value={familyDoctorNumber} onChange={handleChange("familyDoctorNumber")} placeholder="Enter Family Doctor Number" />
      </FormGroup>
      <FormGroup row>
        <Label for="anyDisability" >Disabled:</Label>
        <Col >
          <Input type="select" name="anyDisability" value={anyDisability} onChange={handleChange("anyDisability")}  id="anyDisability">
          <option value="yes">Yes</option>
            <option  selected value="no">No</option>
            </Input>
        </Col>
      </FormGroup>
      <FormGroup>
        <Label for="severeDisease">Enter Disease You Have</Label>
        <Input type="text" name="severeDisease" id="severeDisease" value={severeDisease} onChange={handleChange("severeDisease")} placeholder="Enter Seperated by ," />
      </FormGroup>
      <FormGroup row>
        <Label for="donor" >Donor</Label>
        <Col >
          <Input type="select" name="donor" value={donor} onChange={handleChange("donor")}  id="donor">
            <option value="yes">Yes</option>
            <option  selected value="no">No</option>
            </Input>
        </Col>
      </FormGroup>
       <FormGroup>
        <Label for="Images">File</Label>
        <Input  onChange={handleChange("image")}
                type="file"
                name="image"
                 multiple
                accept="image"
                placeholder="choose a file"/>

      </FormGroup>
      <Button type="submit" onClick={submitHandler} >Submit</Button>
    </Form>

      </Col>

      <Col md={3}>
        <h2> Your Documents</h2>
        {img.map((image)=>(
            <div style={{display:"flex",justifyContent:"center",alignItem:"center"}}>
              <img key={image.cloudinary_id} style={{height:"30vh",width:"20vw", marginLeft:"10vw"}} 
            
            src={image.image_url} alt="images"></img>
            <button style={{alignSelf:"center"}} onClick={()=>{saveAs(image.image_url, image.cloudinary_id)}}>Download</button>
            </div>
          ))}
         
      </Col>

    </Row>
   

  
  )

};

export default PrivateScreen;






// const [error, setError] = useState("");
//   const [privateData, setPrivateData] = useState("");

//   useEffect(() => {
//     const fetchPrivateDate = async () => {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       };

//       try {
//         const { data } = await axios.get("/api/private", config);
//         setPrivateData(data.data);
//       } catch (error) {
//         localStorage.removeItem("authToken");
//         setError("You are not authorized please login");
//       }
//     };

//     fetchPrivateDate();
//   }, []);
//   return error ? (
//     <div>
//       {history.push("./login")}
//       <span className="error-message">{error}</span>
//     </div>
//     ) : (
    
//     <div>
//        <button  className="btn btn-danger"
//             onClick={()=>{history.push("/login") 
//           localStorage.removeItem("authToken")
//     }}
//     >Logout</button>
//       <div>{privateData}</div>
//       <UserForm/>
     
//     </div>
  
//   );
