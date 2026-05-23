import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../azure/config";
import React from "react";
import './login.css';



function handleLogin(instance,account,props) {
    console.log("Inside App")
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });

    
  }



function Login(props) {
    const { instance,accounts  } = useMsal();
    return (
      
      
        <div className="Login"  >
  
          
          <div className="card LoginCard" >
            <div className="card-body">
                <h5 className="card-title">SQL  Access</h5>
               
                <p className="card-text">This app is used to provide access to users on Database,Please login to continue</p>
               
                <button className="btn btn-primary" type="submit" onClick={()=>handleLogin(instance,accounts,props)}>Login</button>
            </div>
            </div>
            
            
        </div>
     
     
    );
  }



  
  export default Login;