import React,{Component} from "react";
import {connect} from 'react-redux';
import './sqlForm.css';
import {getDatabases,insertRecord,getPendingRequests,close,checkLogins,hidesubmit} from '../actions/sqlaccessactions';
import PendingRequest from "./pendingrequest";
import { MsalContext, useMsal } from "@azure/msal-react";
import { loginRequest } from "../azure/config";
import ErrorCard from "./errorcard";

import SuccessCard from '../components/successcard';


class SqlForm extends Component{

  apiGetDatabase="http://localhost:5000/api/getDatabases"
  apiGrantAccess="http://localhost:5000/api/grantAccess"

  

  componentDidMount(){

    this.props.getpendingrequests()

  }

  state={
    sqlformdata:{
        username:'',
        server:'',
        databaselist:["test","test1","test2"],
        role:'',
        database:'',
        timeInterval:'',
        approvedBy:'',
        status:'pending',
        Email:''
    }
}

username=(e)=>{

  
  this.setState({sqlformdata:{

    ...this.state.sqlformdata,
    username:e.target.value
  }})

  this.props.hidesubmit()

  


  console.log(this.state)
}

email=(e)=>{

  
  this.setState({sqlformdata:{

    ...this.state.sqlformdata,
    Email:e.target.value
  }})

  


  console.log(this.state)
}

fetchAllDatabases=async (serverName)=>{
  console.log("Inside fetch all Databases")
  try {
    var result=await fetch(this.apiGetDatabase,{method: 'POST',headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }, body: JSON.stringify({server:serverName})})
  console.log(result)
    var response=await result.json()
    console.log(response) 
    console.log(response.databaseList)

    if(response.databaseList.length>0){
      this.setState({
        sqlformdata:{
          ...this.state.sqlformdata,
          databaselist:response.databaseList
        }
      })
    }

    console.log(this.state)
    
  } catch (error) {

    console.log(error)
    
  }
  
}


grantAccess=async ()=>{
  console.log("Inside Grant Access")
  try {
    var result=await fetch(this.apiGrantAccess,{method: 'POST',headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }, body: JSON.stringify(this.state.sqlformdata)})
  console.log(result)
    var response=await result.json()
    console.log(response) 
    
    

    
    
  } catch (error) {

    console.log(error)
    
  }


}

server=(e)=>{

  console.log(e.target.value)
  this.setState({sqlformdata:{
    ...this.state.sqlformdata,
    server:e.target.value
  }})

  // this.fetchAllDatabases(e.target.value)
  this.props.getdatabases({server:e.target.value})
  this.props.hidesubmit()

  console.log(this.state)
}

role=(e)=>{

  console.log(e.target.value)
  this.setState({sqlformdata:{
    ...this.state.sqlformdata,
    role:e.target.value
  }})

  
  this.props.hidesubmit()

  console.log(this.state)
}

database=(e)=>{

  console.log(e.target.value)
  this.setState({sqlformdata:{
    ...this.state.sqlformdata,
    database:e.target.value,
    username:this.context.accounts[0].username.split("@")[0],
    Email:this.context.accounts[0].username
  }})

  
  
  this.props.hidesubmit()

  console.log(this.state)
}

timeinterval=(e)=>{

  console.log(e.target.value)
  this.setState({sqlformdata:{
    ...this.state.sqlformdata,
    timeInterval:e.target.value
  }})

  
  this.props.hidesubmit()

  console.log(this.state)
}

approvedBy=(e)=>{

  console.log(e.target.value)
  this.setState({sqlformdata:{
    ...this.state.sqlformdata,
    approvedBy:e.target.value
  }})

  


  console.log(this.state)
}



databaselist=''

submit=(e)=>{
  e.preventDefault()
  console.log(this.state)
  //this.grantAccess()
  this.props.insertrecord(this.state.sqlformdata)
}

verify=(e)=>{
  e.preventDefault()
  

  this.setState({sqlformdata:{
    ...this.state.sqlformdata,
    username:this.context.accounts[0].username.split("@")[0],
    Email:this.context.accounts[0].username


  }})
  console.log(this.state)
  //this.grantAccess()
  this.props.checklogins(this.state.sqlformdata)
}
 

reason=(e)=>{
  //console.log(e.target.value)
  this.setState({sqlformdata:{

    ...this.state.sqlformdata,
    Reason:e.target.value
  }})

  this.props.hidesubmit()

}
 

static contextType = MsalContext;
render(){

  console.log(this.context.accounts[0].username)
  
    this.databaselist=this.props.sqlformdata.databaselist.map((database) => {
      
      return (
        <option value={`${database.DBname}`}>{database.DomainURL}  ({database.DBname})</option>
      )
  })

  var sqlform=<div className="sqlForm">
 <form >

     
 <div className="input-group mb-3">
  <input type="text" className="form-control" value={this.context.accounts[0].username.split("@")[0]} aria-label="Username" onChange={this.username} disabled/>
   
</div>

<div className="input-group mb-3">
  <input type="Email" className="form-control" value={this.context.accounts[0].username} aria-label="Email" onChange={this.email} disabled/>
   
</div>

  <select className="form-select mb-3" aria-label="Default select example" onChange={this.server}>
  <option selected>Please select the server</option>
  <option value="X.X.X.X">XXXXXXXXXX</option>
  
  

</select>

<div className="input-group mb-3">

<select className="form-select " aria-label="Default select example" onChange={this.database}>
  <option selected>Please select the Database</option>
  {this.databaselist}
</select>

</div>

<div  className="input-group mb-3">
<select className="form-select " aria-label="Default select example" onChange={this.role}>
  <option selected>Please select the Role</option>
  {/* <option value="db_owner">db_owner</option> */}
  <option value="db_datareader">db_datareader</option>
  <option value="sp_execute">sp_execute (To execute Stored Procedures)</option>
  
</select>

</div>

<div  className="input-group mb-3">
<select className="form-select " aria-label="Default select example" onChange={this.timeinterval}>
  <option selected>Please select the Time Interval(Hours)</option>
  <option value="1">1</option>
  <option value="3">3</option>
  <option value="5">5</option>
</select>

</div>

<div  className="input-group mb-3">
  
<textarea className="form-control rounded-0" id="exampleFormControlTextarea2" rows="3" placeholder="Please specify the reason for DB access and Donot use single quotes anywhere" onChange={this.reason}></textarea>

</div>
 
{/* <div  className="input-group mb-3">
<select className="form-select " aria-label="Default select example" onChange={this.approvedBy}>
  <option selected>Please select the Approval</option>
  <option value="nishant.malge@caresmartz360.com">Nishant</option>
  <option value="harneet.singh@caresmartz360.com">Harneet</option>
  
</select>

</div> */}


<button className="btn btn-info infocard" type="submit" onClick={this.verify}>Verify</button>
{this.props.verify==true?<button className="btn btn-primary" type="submit" onClick={this.submit}>Submit</button>:''}

</form>
</div>

    
    return (
      <div className="container">
        {this.props.error.status=='Error'?<ErrorCard Message={this.props.error.Message} close={this.props.close}/>:''}
        {this.props.success==true?<SuccessCard Message="Your request has been sent successfully"/>:''}
        {sqlform}
      </div>
     );

}

}

const mapStateToProps=(state)=>{

  return({

    sqlformdata:state.sqlformdata,
    success:state.success,
    verify:state.verify,
    error:state.error

  })

}



const mapDispatchtoProps = (dispatch) => {
  return {
      
      getdatabases:(server)=>dispatch(getDatabases(server)),
      insertrecord:(sqlaccessinfo)=>dispatch(insertRecord(sqlaccessinfo)),
      getpendingrequests:()=>dispatch(getPendingRequests()),
      close:()=>dispatch(close()),
      checklogins:(sqlaccessinfo)=>dispatch(checkLogins(sqlaccessinfo)),
      hidesubmit:()=>dispatch(hidesubmit()),

      
      
      

  }

}
export default connect(mapStateToProps,mapDispatchtoProps)(SqlForm);