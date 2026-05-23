import React, { Component } from 'react'
import './error-card.css';



function close(props){
    console.log(props)
    props.close()
    
}
export default function ErrorCard(props) { 

    
    
        return (
            
                <div class="card errorcard">
                <div class="card-header">
                Error
                </div>
                <div class="card-body">
                <h5 class="card-title">{props.Message}</h5>
                <p class="card-text"></p>
                <button type="button" className="btn btn-danger" onClick={()=>close(props)}>Close</button>
                </div>
            </div>
            
        )
    
}
