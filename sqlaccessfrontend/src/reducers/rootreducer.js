const initialState={
    sqlformdata:{
        username:'',
        server:'',
        databaselist:["test","test1","test2"],
        role:'',
        database:'',
        timeInterval:'',
        approvedBy:'',
        status:'pending'
    },
    pendingrequests:[ ],
    error:{
        status:null,
        message:null
    },
    success:false,
    verify:false


}

const rootreducer=(state=initialState,action)=>{

    switch (action.type) {
        case 'GET_DATABASES':
            console.log(action.payload)
            return{
                ...state,
                sqlformdata:{
                    ...state.sqlformdata,
                    databaselist:action.payload.databaseList

                }
               
                
            }
        case 'INSERT_RECORD':
                console.log(action.payload)
                return{
                    ...state,
                    success:true
                   
                    
                }
        case 'GET_PENDING':
                console.log(action.payload)
                return{
                        ...state,
                        pendingrequests:action.payload
                       
                        
                    }

        case 'GRANT_ACCESS':
                console.log(action.payload)
                return{
                                ...state,
                                success:true
                                
                            }
        
        case 'CLOSE':
                return({
                        ...state,
                        error:{
                            status:null,
                            message:null
                            },
                        success:false
                                    
                                })
        case 'ERROR':
            console.log("inside error",action.payload)
            return({
                ...state,
                error:{
                    status:action.payload.status,
                    Message:action.payload.Message
                },
                success:false
            })

        case 'CHECK_LOGINS':
            return({
                ...state,
                verify:true
            })
        case 'HIDE_SUBMIT':
                return({
                    ...state,
                    verify:false
                })
        default:
            break;
    }
    return state
}


export default rootreducer;