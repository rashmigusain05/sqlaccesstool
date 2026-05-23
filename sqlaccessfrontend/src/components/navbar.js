import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import cs360logo from '../assets/caresmartz360-logo.png';


function handleLogout(instance) {
    console.log("Inside logout")
    instance.logoutRedirect().catch(e => {
        console.error(e);
    });
}

function Navbar(){
   
    const { instance } = useMsal();
    


    
    return(
        <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">
                        <img  alt='CS360' src={cs360logo} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/">Home</NavLink>

                            </li>
                            <li className="nav-item">

                                <NavLink className="nav-link" to="/pendingrequests">PendingRequests</NavLink>
                            </li>

                        </ul>
                        
                        <AuthenticatedTemplate>
                        <ul className="navbar-nav ml-auto" >
                            <li className="nav-item ">
                                 <NavLink className="nav-link" to="/"  >
                                 <button className="btn btn-primary" type="submit" onClick={()=>handleLogout(instance)}>Logout</button>

                                 </NavLink>
           
                            </li>
                        </ul>
                        </AuthenticatedTemplate>
                    </div>

                </nav>

           
       

    </div>

    )
}


export default Navbar;