import React,{useState,useEffect} from 'react'
import axios from "axios";
import QRCode from 'qrcode.react';
import ReactToPdf from "react-to-pdf";
import bg from "../bg.png"
import  Navbar  from "../screens/Navbar"





const Card = ({match}) => {

    useEffect(() => {
        const getUserDetails= async()=>{
          
          let {data} =   await axios.get(`/api/private/details/${match.params.user_id}`,config)
           if(data){
              setData({
                fullname:data.fullname,
                age:data.age,
                image:data.images,
                userId:data.user
              })
              
           }
           setLoading(false)
       }
      
        getUserDetails()
      },[] )// eslint-disable-line react-hooks/exhaustive-deps
      const [loading,setLoading] = useState(true);
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

    const ref = React.createRef();
    
    return (
        <>
       <Navbar/>

        <div style={{display:"flex" ,justifyContent:"center",alignItems:"center"}}>
            <ReactToPdf targetRef={ref} filename="div-blue.pdf">
                    {({toPdf}) => (
                        <button onClick={toPdf}>Generate pdf</button>
                    )}
             </ReactToPdf>
             <div  style={{width: 800, height: 500, backgroundImage:`url(${bg})`,position:"relative",border:"1px solid"}} ref={ref}>
                    <div style={{position:"absolute",marginTop:230,marginLeft:30,display:"flex"}} >
                            <QRCode
                                    //value={`http://localhost:3000/otherUser/${data.userId}/`}
                                    value={`https://onenationonehealth1.herokuapp.com/otherUser/${match.params.user_id}/`}
                                    size={128}
                                    bgColor={"#ffffff"}
                                    fgColor={"#000000"}
                                    level={"L"}
                                    includeMargin={false}
                                    renderAs={"svg"}
                                    />
                        <div style={{marginLeft:10}}>
                        <h1>Name:{data.fullname}</h1>
                        <h2>age:{data.age}</h2>
                        </div>
                        </div>            
            </div>
        </div> 
        
        </>
    )
}

export default Card;
