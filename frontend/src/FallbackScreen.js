
import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import PulseLoader from "react-spinners/PulseLoader";


function FallbackScreen() {
  let loading=true
  let color="blue"


  let style={
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      backgroundColor:"black",
      width:"100%",
      height:"100vh",
      color:"white",
      

    }

  return (
    <div className="sweet-loading" style={style}>
            <h1>Loading<span style={{paddingTop:"5%"}}><PulseLoader color={color} loading={loading} speedMultiplier={0.5}  size={10} /></span></h1>
             <RingLoader color={color} loading={loading} speedMultiplier={1.5}  size={250} />
    </div>
  );
}

export default FallbackScreen;