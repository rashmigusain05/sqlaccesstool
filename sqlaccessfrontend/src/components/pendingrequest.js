import React, { Component } from 'react';
import './pendingrequest.css';
import {connect} from 'react-redux';
import {getPendingRequests,grantAccess,close} from '../actions/sqlaccessactions';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Login from '../pages/login';
import SuccessCard from './successcard';
import ErrorCard from './errorcard';
import { useMsal } from "@azure/msal-react";
import {  MsalContext } from "@azure/msal-react";


function GetUser(){
    const { accounts } = useMsal();
   const username = accounts[0].username;

   return <div>
       Welcome {username}
   </div>
}

class PendingRequest extends Component {

    constructor(props){
        super(props);  
        
        console.log(this.props)
        
        this.props.getpendingrequests();
        
    
    }
    componentDidMount(){
        console.log("mount")
        this.props.getpendingrequests();
    }

    
    submit=(prequest,approvedBy)=>{
        console.log("Approved",prequest)
        prequest={
            ...prequest,
            ApprovedBy:approvedBy
        }
        this.props.grantaccess(prequest)

    } 
    
    static contextType = MsalContext;


    render() {
       
        try {
            console.log(this.context.accounts[0].username)
            
        } catch (error) {
            console.log(this.context.accounts.length)
            console.log(error)
        }
        

        console.log(this.props.pendingRequests)
        console.log(this.props.match.params.id)
        console.log(this.props)
        var pendingrequest=this.props.pendingRequests.find((pendingrequest)=> {
            console.log(pendingrequest)

            return (pendingrequest.RequestID==this.props.match.params.id)})
        console.log(pendingrequest)
        
        var unauthorized=(
            <h3>
            You are not Authorized to perform this operation
            </h3>
        )
        const pendingRequest =  (pendingrequest==undefined?'Loading':
                    <div className="card approveCard" >

                        <div className="card-body">
                            <h5 className="card-title">Username:{pendingrequest.Username}</h5>
                            <h5 className="card-title">Role    :{pendingrequest.Role}</h5>
                            <h5 className="card-title">Database:{pendingrequest.DatabaseName}</h5>
                            <h5 className="card-title">Server:{pendingrequest.Server}</h5>
                            <h5 className="card-title">ApprovedBy:{this.context.accounts.length>0?this.context.accounts[0].username:''}</h5>



                        </div>
                         
                        <button className="btn btn-primary " type="submit" onClick={()=>this.submit(pendingrequest,this.context.accounts[0].username)}>Approve</button>
                    </div>
                );
            
        var message=pendingrequest==undefined?'Loading':`${pendingrequest.Role} has been assigned to ${pendingrequest.Username} on ${pendingrequest.DatabaseName}`
        return (
            
            <div className="container">
                {this.props.success==true?<SuccessCard Message={message}/>:''}
                {this.props.error.status=='Error'?<ErrorCard Message={this.props.error.Message} close={this.props.close}/>:''}
                <AuthenticatedTemplate>
                {this.context.accounts.length==0?<Login/>:''}    
                {this.context.accounts.length>0 && (this.context.accounts[0].username=='navjot.singh@caresmartz360.com'||this.context.accounts[0].username=='harman.saini@caresmartz360.com'||this.context.accounts[0].username=='pawan.kumar@caresmartz360.com'||this.context.accounts[0].username=='shailender.bhatia@caresmartz360.com'
                ||this.context.accounts[0].username=='pareena.sardarjeet@caresmartz360.com'||this.context.accounts[0].username=='vibhor.mahajan@caresmartz360.com'||this.context.accounts[0].username=='ankur.banga@caresmartz360.com'||this.context.accounts[0].username=='gaurav.setia@caresmartz360.com'||this.context.accounts[0].username=='harneet.singh@caresmartz360.com'||this.context.accounts[0].username=='harpreet.singh@caresmartz360.com'||this.context.accounts[0].username=='sanjeev.vij@caresmartz360.com'||this.context.accounts[0].username=='rashmi.singh@caresmartz360.com'||this.context.accounts[0].username=='kshitij.vyas@caresmartz360.com'||this.context.accounts[0].username=='mandeep.singh@caresmartz360.com'||this.context.accounts[0].username=='rohan.unvi@caresmartz360.com')? pendingRequest:unauthorized}
                 <GetUser/>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
           <Login/>
        </UnauthenticatedTemplate>
             
            </div>)

    }

}

const mapStateToProps=(state)=>{

    return({
  
      pendingRequests:state.pendingrequests  ,
      success:state.success,
      error:state.error
    })
  
  }
  
    
    const mapDispatchtoProps = (dispatch) => {
        return {
            
            
            getpendingrequests:()=>dispatch(getPendingRequests()),
            grantaccess:(sqlaccessinfo)=>dispatch(grantAccess(sqlaccessinfo)),
            close:()=>dispatch(close())
      
            
            
            
      
        }
      
      }
export default connect(mapStateToProps,mapDispatchtoProps)(PendingRequest);
