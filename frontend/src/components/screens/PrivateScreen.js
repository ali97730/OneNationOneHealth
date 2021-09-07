import { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../UserForm";


const PrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);
  return error ? (
    <div>
      {history.push("./login")}
      <span className="error-message">{error}</span>
    </div>
    ) : (
    
    <div>
       <button  className="btn btn-danger"
            onClick={()=>{history.push("/login") 
          localStorage.removeItem("authToken")
    }}
    >Logout</button>
      <div>{privateData}</div>
      <UserForm/>
     
    </div>
  
  );
};

export default PrivateScreen;
