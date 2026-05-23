import React, { Component, useState } from 'react'
import './success-card.css';




function close(){
    //console.log(props)
    //props.close()
   
    window.location.reload();
    window.location.replace("https://sqlaccess.caresmartz360.net")

    
}
export default function SuccessCard(props) { 
       console.log(props)
    
    
        return (
            
                <div class="card successcard">
                <div class="card-header">
                Success
                </div>
                <div class="card-body">
                <h5 class="card-title">{props.Message}</h5>
                <p class="card-text"></p>
                <button type="button" className="btn btn-success" onClick={()=>close()}>Close</button>
                </div>
            </div>
            
        )
    
}
