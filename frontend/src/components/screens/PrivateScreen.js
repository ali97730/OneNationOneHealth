

import { useState ,useEffect, } from "react";
import  Navbar  from "../screens/Navbar"
import axios from "axios";
import validator from 'validator';
import { Button, Form, FormGroup, Label, Input,InputGroup, InputGroupAddon, InputGroupText,FormFeedback, CustomInput,
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { saveAs } from 'file-saver';
import { jsonState } from "../../stateAndCity";
import { toast,ToastContainer } from "react-toastify";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "./PrivateScreen.css"
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';

import { Divider } from "@mui/material";


const PrivateScreen = ({history,match}) => {

    useEffect(() => {
      const getUserDetails= async()=>{

         let {data} =  await axios.get(`/api/private/details/${match.params.user_id}`,config)
              
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
            })
            
            setImg(data.images)
            setitems(data.items)
         }
     }
    
       getUserDetails()
     
    },[] )// eslint-disable-line react-hooks/exhaustive-deps

    const [familyDoc,setFamilyDoc] =  useState(false)
    const [disabled,setDisabled] =  useState(false)
    const [don,setDon] =  useState(false)
    const [dis,setDis] =  useState(false)
    const stateofIndia = Object.keys(jsonState)
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [item,setItem] = useState({
      dateofDiagnosed:"",
      hospitalname:"",
      purpose:""
    })
    const {dateofDiagnosed} =item
    
    
  const [data,setData] = useState({
    fullname:"",
    contactNumber:"",
    address:"",
    city:jsonState[stateofIndia[0]][0],
    state:stateofIndia[0],
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
    items:[]
  })
  const [items,setitems] = useState([])
  const [img,setImg] = useState([])
  const [error,setError] = useState({
    fullname:null,
    contactNumber:null,
    address:null,
    pincode:null,
    dateOfBirth:"",
    emergencyPhoneNumber:null,
    familyDoctorNumber:null,
    age:null,
    userId:""
  });

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

  function Validation(field,value){
        if(field === "contactNumber"){ validator.isNumeric(value) && value.length ===10 && (value%1 === 0 ) ? setError({...error,contactNumber:false}):setError({...error,contactNumber:true})}
        if(field === "emergencyPhoneNumber"){ validator.isNumeric(value) && value.length ===10 && (value%1 === 0 ) ? setError({...error,emergencyPhoneNumber:false}):setError({...error,emergencyPhoneNumber:true})}
        if(field === "familyDoctorNumber"){ validator.isNumeric(value) && (value.length ===10 || value.length===0) && (value%1 === 0 ) ? setError({...error,familyDoctorNumber:false}):setError({...error,familyDoctorNumber:true})}
        if(field === "age"){ (value%1 === 0 )  && value > 0 && value <=100 ? setError({...error,age:false}):setError({...error,age:true})}
        if(field === "address"){ value.length > 0 && value.length <=100 ? setError({...error,address:false}):setError({...error,address:true})}
        if(field === "pincode"){ validator.isNumeric(value) && value.length <=6 && value >0 ? setError({...error,pincode:false}):setError({...error,pincode:true})}
        if(field === "fullname"){validator.isAlpha(value) ? setError({...error,fullname:false}):setError({...error,fullname:true})}

    

  } 
 
  var formData = new FormData();
  const handleChange=name=>event=>{


      Validation(name,event.target.value)
   if(name ==="state"){
    const value = event.target.value
    setData({...data,[name]:value,city:jsonState[value][0]})
   }else{
    if(name ==="image"){
      let arr = Array.from(event.target.files)
      setData({...data,image:arr})
    }else{
      const value = event.target.value
      console.log(value)
      setData({...data,[name]:value})
    }
   }
}

  
  const submitHandler = async (e)=>{
    e.preventDefault()
      if(error.fullname || error.pincode  || error.address || 
        error.age  || error.contactNumber  ||
        error.familyDoctorNumber ){   
          // setError(error.response.data.error);
          console.log(error)
      toast("Invalid Credentials",{type:"error"})
      return
        }
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
    formData.set("items",JSON.stringify(items))
    

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
            history.push(`/details/certificate/${match.params.user_id}`)
        }
      ).catch((err)=>{
        console.log(err)
        history.push("/")
      })

    }

  } catch (error) {
    
    console.log(error)
    history.push("/")
  }
  
}

  return(

   <div style={{backgroundImage:"linear-gradient(#DB0B5F, #6F00ED)",color:"white"}}>
      <Navbar/>
   <Form onSubmit={submitHandler} className="container parentContainer">
   <ToastContainer/>
      <FormGroup className="row formRow">
         <div className="col-3 offset-1">
           <Label  className="formLabel" htmlFor="fullname"><h3>Fullname </h3></Label>
         </div>
         <div className="col-7">
           <Input type="text" name="fullname" id="fullname" valid={fullname.length === 0 ? false : !error.fullname} invalid={error.fullname} value={fullname}  onChange={handleChange("fullname")} placeholder="Firstname Middlename Lastname" />
           <FormFeedback invalid={error.fullname}>{error&&fullname.length === 0?"Fullname is Required":"It should not contain Number or symbols"}</FormFeedback>
        </div>
      </FormGroup>
      <Divider light/>
      <FormGroup className="row formRow">
         <div className="col-3 offset-1">
         <Label htmlFor="contactNumber"><h3>Contact Number  </h3></Label>
         </div>
         <div className="col-7">
         <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>+91</InputGroupText>
              </InputGroupAddon>
              <Input type="number" name="contactNumber" id="contactNumber" valid={contactNumber.length === 0 ? false : !error.contactNumber} invalid={error.contactNumber} value={contactNumber} onChange={handleChange("contactNumber")} placeholder="Enter Your Contact Number" />
             <FormFeedback invalid={error.contactNumber}>{contactNumber.length === 0?"please enter Contact number":"This is Invalid Number"}</FormFeedback>

          </InputGroup>      
           </div>
      </FormGroup>
      <Divider light/>
      <FormGroup className="row formRow">
         <div className="col-3 offset-1">
         <Label htmlFor="age"><h3>Enter Your Age</h3></Label>
         </div>
         <div className="col-2">
             <Input type="text" name="age" id="age" valid={age.length === 0 ? false : !error.contactNumber} invalid={error.age} value={age} onChange={handleChange("age")} placeholder="  Age" />
             <FormFeedback invalid={error.age}>Please enter valid age</FormFeedback>

        </div>
        <div className="col-2 ">
        <Label htmlFor="gender" ><h3>Select Gender</h3></Label>
        </div>
        <div className="col-3">
        <FormControl  variant="filled" style={{backgroundColor:"white",borderRadius:"5px"}} fullWidth>
              <InputLabel id="demo-simple-select-label" htmlFor="age">Gender</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="gender"
                name="gender" 
                value={gender} 
                onChange={handleChange("gender")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>

        </FormControl>
        </div>
      </FormGroup>
      <Divider light/>  
      <FormGroup className="row formRow">
         <div className="col-3 offset-1">
         <Label htmlFor="address"><h3>Address</h3></Label>
         </div>
         <div className="col-7">
            <Input type="textarea" name="address" id="address" valid={address.length === 0 ? false : !error.contactNumber} invalid={error.address} value={address} onChange={handleChange("address")} placeholder="Enter Your Address" />
            <FormFeedback invalid={error.age}>{address.length === 0 ?"Please enter your Address":"Address Should be less than 100 Character"}</FormFeedback>

        </div>
      </FormGroup>
      <Divider light/>
      <FormGroup className="row formRow">
         <div className="col-1 offset-1">
              <Label htmlFor="city"><h3>City</h3></Label>
         </div>
         <div className="col-2">
         <FormControl variant="filled" style={{backgroundColor:"white",borderRadius:"5px"}} fullWidth>
         <InputLabel id="demo-simple-select-labelcity" htmlFor="city">City</InputLabel>
                <Select
                labelId="demo-simple-select-labelcity"
                id="city"
                name="city" 
                value={city} 
                onChange={handleChange("city")}
              >
                {
                jsonState[state].map((s,index)=>(
                <MenuItem  value={s} key={index}>{s}</MenuItem>
                ))}
                
              </Select>
          </FormControl>
        </div>
        <div className="col-1 " style={{marginLeft:"2%"}}>
            <Label htmlFor="state"><h3>State</h3></Label>
         </div>
         <div className="col-2">
         <FormControl  variant="filled" style={{backgroundColor:"white",borderRadius:"5px"}} fullWidth>
         <InputLabel id="demo-simple-select-labelstate" htmlFor="state">State</InputLabel>
                <Select
                labelId="demo-simple-select-labelstate"
                id="state"
                name="state" 
                value={state} 
                onChange={handleChange("state")}
              >
                {stateofIndia.map((s,index)=>(
                <MenuItem value={s} key={index}>{s}</MenuItem>
                  
                ))}
                
              </Select>
          </FormControl>
        </div>
        <div className="col-1"style={{marginLeft:"1%"}} >
        <Label htmlFor="pincode"><h3>Pincode</h3></Label>
         </div>
         <div className="col-2" style={{marginLeft:"5%"}} >
            <Input type="number" name="pincode" id="pincode" value={pincode} valid={pincode.length === 0 ? false : !error.pincode} invalid={error.pincode} onChange={handleChange("pincode")} placeholder="Enter Your pincode" />
            <FormFeedback invalid={error.pincode}>{pincode.length === 0 ?"Please enter pincode":"Enter a Valid Pincode"}</FormFeedback>

          </div>

      </FormGroup>
      <Divider light/>
      <FormGroup className="row formRow">
         <div className="col-2 offset-1">
            <Label htmlFor="dateOfBirth"><h3>Date of Birth</h3></Label>
         </div>
         <div className="col-3">
                <Input type="date"  name="dateOfBirth" id="dateOfBirth" value={dateOfBirth} onChange={handleChange("dateOfBirth")} placeholder="Date Of Birth" />
         </div>
         <div className="col-2 ">
          <Label htmlFor="bloodGroup"><h3>Blood Group</h3></Label>
         </div>
         <div className="col-3">
         <FormControl  variant="filled" style={{backgroundColor:"white",borderRadius:"5px"}} fullWidth>
              <InputLabel id="demo-simple-select-label-bloodGroup" htmlFor="bloodGroup">Blood Group</InputLabel>
                <Select
                labelId="demo-simple-select-label-bloodGroup"
                id="bloodGroup"
                name="bloodGroup" 
                value={bloodGroup} 
                onChange={handleChange("bloodGroup")}
              >
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                

              </Select>
        </FormControl>  </div>
      </FormGroup>

      <Divider light/>
      <FormGroup className="row formRow">
      <div className="col-2 offset-1">
      <Label htmlFor="emergencyPhoneNumber"><h3>Emergency Contact Number</h3></Label>
         </div>
         <div className="col-3">
         <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>+91</InputGroupText>
              </InputGroupAddon>
              <Input type="number" name="emergencyPhoneNumber" id="emergencyPhoneNumber" valid={emergencyPhoneNumber.length === 0 ? false : !error.emergencyPhoneNumber} invalid={error.emergencyPhoneNumber}value={emergencyPhoneNumber} onChange={handleChange("emergencyPhoneNumber")} placeholder="Enter Emergency Contact Number" />
             <FormFeedback invalid={error.emergencyPhoneNumber}>{emergencyPhoneNumber.length === 0?"please enter Contact number":"This is Invalid Number"}</FormFeedback>

     </InputGroup>      
           </div>

           {familyDoc?(
             <>
             <div className="col-2 ">
             <Label htmlFor="familyDoctorNumber"><h3>Family Doctor Number</h3></Label>
           </div>
    
           <div className="col-3">
           <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>+91</InputGroupText>
                </InputGroupAddon>
                <Input type="number" name="familyDoctorNumber" id="familyDoctorNumber" valid={familyDoctorNumber && familyDoctorNumber?.length === 0 ? false : !error.familyDoctorNumber} invalid={error.familyDoctorNumber}value={familyDoctorNumber} onChange={handleChange("familyDoctorNumber")} placeholder="Enter Emergency Contact Number" />
             <FormFeedback invalid={error.familyDoctorNumber}>{familyDoctorNumber && familyDoctorNumber.length === 0?"please enter Contact number":"This is Invalid Number"}</FormFeedback>
               </InputGroup>      
             <CustomInput type="checkbox" checked={familyDoc} id="exampleCustomCheckbox" onChange={()=>{setFamilyDoc(!familyDoc)}} label="un-Check if not having" />

             </div>
             </>
           ):(
            <>
            <div className="col-2 ">
            <Label htmlFor="familyDoctorNumber"><h3>having Family Doctor ? </h3></Label>
          </div>
   
          <div className="col-3" >
          <InputGroup>
               <CustomInput checked={familyDoc} type="checkbox" id="exampleCustomCheckbox" onChange={(e)=>{setFamilyDoc(!familyDoc)}}  />
               <h6>Check to enter Family Doctor Number</h6>
      </InputGroup>      
            </div>
            </>
           )}
      </FormGroup>

      <Divider light/>
      <FormGroup className="row formRow">
       
        <div className="col-2 offset-1">
        <Label htmlFor="anyDisability" ><h3>{disabled?"Select disability":"Having Disability ?"}</h3></Label>
        </div>
        <div className="col-3">
        {
              disabled?(
               <>
                <FormControl variant="filled" style={{backgroundColor:"white",borderRadius:"5px"}} fullWidth>
               <InputLabel id="demo-simple-select-label-anyDisability" htmlFor="anyDisability">disability</InputLabel>
                <Select
                labelId="demo-simple-select-label-anyDisability"
                id="anyDisability"
                name="anyDisability" 
                value={anyDisability} 
                onChange={handleChange("anyDisability")}
              >
                <MenuItem value="physical disability">physical disability.</MenuItem>
               <MenuItem value="vision Impairment">vision Impairment</MenuItem>
                <MenuItem value="deaf or hard of hearing">deaf or hard of hearing</MenuItem>
                <MenuItem value="mental health conditions">mental health conditions</MenuItem>
                <MenuItem value="intellectual disability">intellectual disability</MenuItem>
                <MenuItem value="acquired brain injury">acquired brain injury</MenuItem>
                <MenuItem value="autism spectrum disorder">autism spectrum disorder</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
        </FormControl>
             <CustomInput type="checkbox" checked={disabled} id="exampleCustomCheckbox" onChange={()=>{setDisabled(!disabled)}} label="un-Check if not having" />

               </>
              ):(
                <InputGroup style={{display:"flex",flexDirection:"column"}}>
                    <CustomInput checked={disabled} type="checkbox" id="exampleCustomCheckbox" onChange={(e)=>{setDisabled(!disabled)}}  />
                    <h6>Check to Select type of disability</h6>
               </InputGroup>  
              )
        }
        </div>
        <div className="col-2 ">
        <Label htmlFor="donor" ><h3>{!don?"Donor ?":"Select Donated organ"}</h3></Label>
        </div>
        <div className="col-3">
            {don?(
              <>
              <FormControl variant="filled" style={{backgroundColor:"white",borderRadius:"5px"}} fullWidth>
              <InputLabel id="demo-simple-select-label-donor" htmlFor="donor">Donor</InputLabel>
                <Select
                labelId="demo-simple-select-label-donor"
                id="donor"
                name="donor" 
                value={donor} 
                onChange={handleChange("donor")}
              >
                <MenuItem value="Kidneys">Kidneys</MenuItem>
                <MenuItem value="Liver">Liver</MenuItem>
                <MenuItem value="Lungs">Lungs</MenuItem>
                <MenuItem value="Heart">Heart</MenuItem>
                <MenuItem value="Pancreas">Pancreas</MenuItem>
                <MenuItem value="Intestines">Intestines</MenuItem>
                <MenuItem value="Hands">Hands</MenuItem>
                <MenuItem value="Legs">Legs</MenuItem>
                <MenuItem value="Eyes">Eyes</MenuItem>
              </Select>
        </FormControl>
             <CustomInput type="checkbox" checked={don} id="exampleCustomCheckbox" onChange={()=>{setDon(!don)}} label="un-Check if not a Donor" />
                </>
            ):(
              <InputGroup style={{display:"flex",flexDirection:"column"}}>
                    <CustomInput checked={don} type="checkbox" id="exampleCustomCheckbox" onChange={()=>{setDon(!don)}}  />
                    <h6>Check to Select donated Organ</h6>
               </InputGroup> 
            )}
        </div>
      </FormGroup>
      <Divider light/>
      <FormGroup className="row formRow" >
      <div className="col-4 offset-1">
        <Label htmlFor="severeDisease" ><h3>Are You Suffering From any Disease</h3></Label>
        <div style={{display:"flex",flexDirection:"row"}}>
        <CustomInput checked={dis} type="checkbox" id="exampleCustomCheckbox" onChange={()=>{setDis(!dis)}}  />
        <h6 style={{marginLeft:"4%"}}>*Check this to Write about the disease</h6>
          </div>
        </div>
        <div className="col-6" style={{marginTop:"3%"}}>
              {dis?(
           <Input type="text" name="severeDisease" id="severeDisease" valid={severeDisease.length === 0 ? false : !error.severeDisease} invalid={error.fullname} value={severeDisease}  onChange={handleChange("severeDisease")} placeholder="Write About Disease Here" />

              ):(<></>)}
        </div>
      </FormGroup>
      <Divider light/>
      <FormGroup className="row formRow">
            <div className="col-6 offset-3 ">
                  <h2>Add Your Last Diagnosed Details 
                    <Fab color="primary"  aria-label="add"  onClick={toggle} style={{marginLeft:"4%"}}>
                    <AddIcon />
                  </Fab></h2>
            </div>
           
      </FormGroup>
      <Divider light/>
      <FormGroup className="row formRow">
            {items.length!==0?(
              items.map((i,index)=>(
                <div key={index} className="col-10 offset-1 itemRow">
                  <div className="itemValue">
                      <div className="itemValue2"><h4 className="rowLabel">Date</h4> <span><DateRangeOutlinedIcon/></span> </div> 
                      <Input   className="disabledInput" disabled value={i.dateofDiagnosed}></Input>
                  </div>
                    <div className="itemValue">
                          <div className="itemValue2"><h4>Visited</h4> <span><LocalHospitalOutlinedIcon/></span> </div> 
                          <Input className="disabledInput" disabled value={i.hospitalname}></Input>

                    </div>
                      <div className="itemValue">
                      <div className="itemValue2"><h4>Purpose</h4><span><ConnectWithoutContactOutlinedIcon/></span> </div> 
                      <Input className="disabledInput" disabled value={i.purpose}></Input>

                      </div>
                
                </div>
              ))
            ):(<></>)}
      </FormGroup>
      <Divider light/>
      
      {
        img.length !==0?(
          <>
          <FormGroup className="row formRow">
            <h1 className="offset-1"> Your Documents</h1>
      </FormGroup>
      <FormGroup className="row formRow" style={{display:"flex"}} >
              

      <div className="col-10 offset-1" style={{display:"flex",overflow:"scroll"}}>
      {img.map((image)=>(
      
      <div>
        <img key={image.cloudinary_id} style={{height:"40vh",width:"25vw", marginRight:"3vw"}} 
          
          src={image.image_url} alt="images"></img>
          <Fab variant="extended"style={{alignSelf:"center",margin:"2%"}} onClick={()=>{saveAs(image.image_url, image.cloudinary_id)}}>Download</Fab>
         
      </div>
    ))}

      </div>  
</FormGroup>
        </>
        ):(<></>)
      }
      
      <FormGroup className="row formRow" >
        <div className="offset-1 col-9">
        <h2>Upload Your Medical Dociments</h2>
            <input className="form-control" type="file" name="image" 
            onChange={handleChange("image")}
            id="formFileMultiple" multiple />
        </div>
      </FormGroup>
      <FormGroup className="row formRow" >
<div className="col-6 offset-5">
<Fab type="submit" variant="extended"style={{alignSelf:"center",margin:"2%",width:"40%",height:"100%"}} onClick={(e)=>{submitHandler(e)}}>Submit</Fab>

  </div>        
      </FormGroup>

   </Form>

   <div>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Enter Details</ModalHeader>
        <ModalBody>
        <Form>
          <FormGroup style={{padding:"2%",paddingTop:"4%"}}>
            <Label for="dateofDiagnosed"><h4>Select Date</h4></Label>
            <Input type="date" name="dateofDiagnosed" value={dateofDiagnosed} id="dateofDiagnosed" placeholder="select Date"
            onChange={(e)=>{setItem({...item,dateofDiagnosed:e.target.value})}}
            />
          </FormGroup>
          <FormGroup style={{padding:"2%",paddingTop:"4%"}}>
            <Label for="hospitalname"><h4>Enter Hospital or Doctors Name</h4></Label>
            <Input type="text" name="hospitalname" id="hospitalname" placeholder="Enter Here" 
             onChange={(e)=>{setItem({...item,hospitalname:e.target.value})}}
             />
          </FormGroup>
          <FormGroup style={{padding:"2%",paddingTop:"4%"}}>
            <Label for="purpose"><h4>Purpose of Visit to Hospital</h4></Label>
            <Input type="text" name="purpose" id="purpose" placeholder="Enter Here" 
             onChange={(e)=>{setItem({...item,purpose:e.target.value})}}
             />
          </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>
          {
          setitems([...items,item])
          setItem({
            dateofDiagnosed:"",
            hospitalname:"",
            purpose:""
          })
          toggle()
        }}
          >Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>

   </div>

  )

};

export default PrivateScreen;


