

import { useState ,useEffect} from "react";
import axios from "axios";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



const PrivateScreen = ({history,match}) => {

    useEffect(() => {
      const getUserDetails= async()=>{
        let {data} =   await axios.get(`/api/private/details/${match.params.user_id}`,config)
         if(data){
            setData({
              fullname:data.fullname,
              age:data.age,
              image:data.image,
              userId:data.user
            })
            
         }
     }
    
      getUserDetails()
    },[] )


  const [data,setData] = useState({
    fullname:"",
    age:"",
    image:"",
    userId:""
  })

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

 
  const {fullname,age} = data
 
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
    formData.set("fullname",data.fullname)
    formData.set("age",data.age)
    console.log(data.image)
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
        console.log(err)
      })

    }

  } catch (error) {
    
    console.log(error)
    history.push("/")
  }
  
}

  return(
    <div>
       <form >
       <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("fullname")}
                type="text"
                name="fullname"
                value={fullname}
                placeholder="choose a file"
              />
            </label>
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("age")}
                type="text"
                name="age"
                value={age}
                placeholder="choose a file"
              />
            </label>
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("image")}
                type="file"
                name="image"
                 multiple
                accept="image"
                placeholder="choose a file"
              />
               <input
                onChange={handleChange("image")}
                type="file"
                name="image"
                // multiple
                accept="image"
                placeholder="choose a file"
              />
            </label>

            <button type="submit" onClick={submitHandler} className="btn btn-outline-success mb-3">
            Submit
          </button>

       </form>

    </div>
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
