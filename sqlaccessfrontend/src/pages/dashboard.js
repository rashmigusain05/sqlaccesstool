import React, { Component } from 'react';

import SqlForm from './sqlForm';
import Login from './login';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

class Dashboard extends Component{

    


    render(){
        return(
            <div>
            
            <AuthenticatedTemplate>
                 <SqlForm/>
           
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
           <Login/>
        </UnauthenticatedTemplate>
        </div>
            
        );
    }
}


export default Dashboard;