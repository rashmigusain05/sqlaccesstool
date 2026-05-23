const axios=require('axios')
var backendaddress='sqlaccess.caresmartz360.net'


export const getDatabases=(server)=>{
    console.log(server)
    return(
        (dispatch)=>{
            
            console.log(JSON.stringify({server:server}))
            //async action
            axios.post(`https://${backendaddress}:5001/api/getDatabases`,
            server).then((response)=>{
                console.log("Inside axios")
                console.log(response.data)
                dispatch({
                    type:'GET_DATABASES',
                    payload:response.data
                })
            
            })
                .catch(
                (err)=>{
                    console.log(err)
                }
            )
        }
    )

}


export const getPendingRequests=()=>{
    console.log("pending requets")
    return(
        (dispatch)=>{
            
           
            //async action
            axios.get(`https://${backendaddress}:5001/api/getPendingRequests`).then((response)=>{
                console.log("Inside axios")
                console.log(response.data)
                dispatch({
                    type:'GET_PENDING',
                    payload:response.data.PendingRequests
                })
            
            })
                .catch(
                (err)=>{
                    console.log(err)
                }
            )
        }
    )

}


export const insertRecord=(sqlAccessinfo)=>{
    console.log(sqlAccessinfo)
    return(
        (dispatch)=>{
            
            console.log(sqlAccessinfo)
            //async action
            axios.post(`https://${backendaddress}:5001/api/insertRecord`,
            sqlAccessinfo).then((response)=>{
                console.log("Inside axios")
                console.log(response.data)

                if(response.data.status=='Error'){
                    dispatch({
                        type:'ERROR',
                        payload:response.data
                    })

                }else{

                    dispatch({
                        type:'INSERT_RECORD',
                        payload:response.data
                    })
            }
               
            
            })
                .catch(
                (err)=>{
                    console.log(err)
                }
            )
        }
    )

}


export const grantAccess=(sqlAccessinfo)=>{
    console.log(sqlAccessinfo)
    return(
        (dispatch)=>{
            
            //async action
            axios.post(`https://${backendaddress}:5001/api/grantAccess`,
            sqlAccessinfo).then((response)=>{
                console.log("Inside axios")
                console.log(response.data)
                
                if(response.data.status=='Error'){
                    dispatch({
                        type:'ERROR',
                        payload:response.data
                    })

                }else{

                dispatch({
                    type:'GRANT_ACCESS',
                    payload:response.data
                })
            }
            
            })
                .catch(
                (err)=>{
                    console.log(err)
                }
            )
        }
    )

}


export const close=()=>{
    return({
        type:'CLOSE'
    })
}

export const checkLogins=(sqlAccessinfo)=>{
    console.log(sqlAccessinfo)
    return(
        (dispatch)=>{
            
            console.log(sqlAccessinfo)
            //async action
            axios.post(`https://${backendaddress}:5001/api/checkLogins`,
            sqlAccessinfo).then((response)=>{
                console.log("Inside axios")
                console.log(response.data)
                if(response.data.status=='Error'){
                    dispatch({
                        type:'ERROR',
                        payload:response.data
                    })

                }
                else{
                    dispatch({
                        type:'CHECK_LOGINS',
                        payload:response.data
                    })
                

                }
                
            })
                .catch(
                (err)=>{
                    console.log(err)
                }
            )
        }
    )

}


export const hidesubmit=()=>{

    return({
        type:'HIDE_SUBMIT'
    })

}