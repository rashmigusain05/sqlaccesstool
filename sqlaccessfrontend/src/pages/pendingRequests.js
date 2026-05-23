import React, { Component } from 'react';

import {connect} from 'react-redux';
import {getPendingRequests} from '../actions/sqlaccessactions';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Login from './login';



class PendingRequests extends Component {

   
    componentDidMount(){
        console.log("mount")
        this.props.getpendingrequests();
    }


    state = {
        pendingrequests: [{
            "username": "Harman",
            "Role": "db_owner",
            "Database": "Test",
            "Server": "NTZ-LAP-083//MSSQLSERVER01",
            "Status": "pending",
            "ID": 1,
            "approvedBy":"Nishant"
        },
        {
            "username": "Ankit",
            "Role": "db_owner",
            "Database": "Test",
            "Server": "NTZ-LAP-083//MSSQLSERVER01",
            "Status": "pending",
            "ID": 2,
            "approvedBy":"Nishant"
        }
    
    ]
    }

   
    changeroute=(ID)=>{
        console.log(ID)
        this.props.history.push(`/pendingrequests/${ID}`)
    }

    render() {

        console.log(this.props)
        const pendingRequests = this.props.pendingRequests.map(
            (pendingrequest) => {
                console.log("Inside Pending Request")
                return (
                    <div className="card" key={pendingrequest.RequestID} onClick={()=>this.changeroute(pendingrequest.RequestID)}>

                        <div className="card-body">
                            <h5 className="card-title">Username: {pendingrequest.Username}</h5>
                            
                            <h5 className="card-title">Database: {pendingrequest.DatabaseName}</h5>
                            <h5 className="card-title">Server:   {pendingrequest.Server}</h5>
                            



                        </div>
                    </div>
                );
            }
        )

        return (
            <div className="container">
                <AuthenticatedTemplate>
                {pendingRequests}
           
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
           <Login/>
        </UnauthenticatedTemplate>
               
            </div>)

}
}
const mapStateToProps=(state)=>{

    return({

  
      pendingRequests:state.pendingrequests  
    })
  
  }
  
    
    const mapDispatchtoProps = (dispatch) => {
        return {
            
            
            getpendingrequests:()=>dispatch(getPendingRequests())
      
            
            
            
      
        }
      
      }



export default connect(mapStateToProps,mapDispatchtoProps)(PendingRequests);