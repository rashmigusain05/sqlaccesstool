const mssql = require('mssql')




var configco={

    user: '',
    password: '',
    server: '',
    database:''


}

const revokeAccess=async ()=>{

    try {
        var dbconn = await mssql.connect(configco);

    } catch (error) {
        console.log("inside error",error)

        
        
        return ({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }

    try {
        const result = await mssql.query`select * from Cloudops.dbo.DatabaseAccessLog 
        where status='active' and datediff(mi,ApprovedAT,GETUTCDATE())>timeinterval*60`

        console.log(result.recordset.length)
        
        await dbconn.close()
        result.recordset.forEach(async (record)=>{
            console.log(record.RequestID)
            await removeUser(record.Server,record.Username,record.DatabaseName)
            await updateRecord(record.RequestID)

        })


        await dbconn.close()
        return({
            databaseList: result.recordset
        })


    } catch (error) {
        console.log(error)
        await dbconn.close()
        return ({
            "status":"Error",
            "Message":"Query not executed successfully"
        })
    }



}


const removeUser= async (Server,Username,Database)=>{

    
var config={

    user: 'sa',
    password: 'l@cr055e',
    server: Server
   


}

    try {
        //var dbconn = await mssql.connect(config);
        const pool1 = new mssql.ConnectionPool(config)
        const poolconnection=pool1.connect();

        await poolconnection;
        var request =  pool1.request();
        
        console.log(`USE [${Database}] DROP USER [${Username}]`)
        var result=await request.query(`USE [${Database}] DROP USER [${Username}]`)

        
        
       

        await pool1.close()
        return({
            "Status": "Success"
        })
       

    } catch (error) {
        console.log("inside error",error)

        
        
        return ({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }

    

}

const updateRecord=async(id)=>{

    try {
        const pool2 = new mssql.ConnectionPool(configco)
        const poolconnection=pool2.connect();

        await poolconnection;
        var request =  pool2.request();

        var result=await request.query(`delete from  dbo.DatabaseAccessLog   where RequestID='${id}'`)

        await pool2.close()
        return({
            "Status": "Success"
        })

    } catch (error) {
        console.log(error)

        
        return ({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }


    

}

// revokeAccess().then(

//     (result)=>console.log(result)

// ).catch(
//     (err)=>console.log(err)
// )

let timerId = setInterval(revokeAccess, 300000);