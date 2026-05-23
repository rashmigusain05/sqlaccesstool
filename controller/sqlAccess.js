const mssql = require('mssql')
const configvalues=require('config')
var nodemailer=require('nodemailer')


var{server,username,password}=configvalues.get('db')
var{serverco,usernameco,passwordco}=configvalues.get('dbCloudops')
var{db}=configvalues.get('databasename')


var config = {
    user: username,
    password: password,
    server: server
};

var configco={

    user: usernameco,
    password: passwordco,
    server: serverco,
    database:db


}

const getDatabases=async(req,res,next)=>{

    config={...config,server:req.body.server}
     
	var serveraddress=req.body.server
	 
    console.log(req.body)
	
	var datasource=''
	
	if(serveraddress=='10.0.4.5'){
        datasource='GxmnXS9ZI6cS7kFnU6f6ew%3D%3D'
	}
    else if(serveraddress=='10.0.1.10'){
        datasource='Qz8cmaJsdzPYi6jQuQRq4g%3D%3D'

    }
    else if(serveraddress=='10.0.1.11'){
        datasource='fY2NI8YB%2FmwVlZCh%2FyUSWA%3D%3D'

    }
	else if(serveraddress=='10.0.1.6'){
        datasource='B7hsepWePgPgaQbGY8v%2FtA%3D%3D'

    }
	else if(serveraddress=='10.0.1.7'){
        datasource='9LdqyLZqdMzuBGucDfAFhQ%3D%3D'

    }
	else if(serveraddress=='10.0.1.12'){
        datasource='jUVtFK9fje03Ig2y706Iog%3D%3D'

    }
	else if(serveraddress=='10.0.1.13'){
        datasource='cLpM2ox1A8WmGCUk8K8x8Q%3D%3D'

    }
	else if(serveraddress=='10.0.1.14'){
        datasource='F%2FRkQY2jha4iUK%2BT2aj5Bw%3D%3D'

    }
	else if(serveraddress=='10.0.1.15'){
        datasource='CR5iUFBSKrr4wvGcEzQZDQ%3D%3D'

    }
	else if(serveraddress=='10.0.1.16'){
        datasource='wEC8TtDK63dl1CErYx1Stg%3D%3D'

    }
	else if(serveraddress=='10.0.1.17'){
        datasource='NDR0VdYewrSj9KGIagE2pw%3D%3D'

    }
	else if(serveraddress=='10.0.1.18'){
        datasource='cxNOb%2FDFnF1irLp61dNkxQ%3D%3D'

    }
	else if(serveraddress=='10.0.1.20'){
        datasource='YfJ7Q3cXc6RgA1IBQmhD3g%3D%3D'

    }
	else if(serveraddress=='10.0.1.21'){
        datasource='h1P4PVUVU41davwKz4%2B%2BUg%3D%3D'

    }
    else{
        datasource='1DoS8RW9tsfSe7am2cbo5Q%3D%3D'

    }
	
    console.log(datasource)
    try {
        var dbconn = await mssql.connect(config);

    } catch (error) {
        console.log("inside error",error)

        
        
        return res.json({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }

    try {
        const result = await mssql.query`select DBname,DomainURL from NTZcaresmartz360.dbo.dbconnectiondetails where isactive=1 and Datasource=${datasource} order by domainurl asc`

        console.log(result.recordset)
        await dbconn.close()
        res.status(200).json({
            databaseList: result.recordset
        })


    } catch (error) {
        console.log(error)
        await dbconn.close()
        return res.json({
            "status":"Error",
            "Message":"Query not executed successfully"
        })
    }

    await dbconn.close()

    

}

const getPendingRequests=async(req,res,next)=>{

    
    
    try {
        var dbconn = await mssql.connect(configco);

    } catch (error) {
        console.log(error)

        
        return res.json({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }
    try {
        const result = await mssql.query`select * from dbo.DatabaseAccessLog where Status='pending'`

        console.log(result.recordset)
        await dbconn.close()
        res.status(200).json({
            PendingRequests: result.recordset
        })


    } catch (error) {
        console.log(error)
        await dbconn.close()
        return res.json({
            "status":"Error",
            "Message":"Query not executed successfully"
        })
    }

    await dbconn.close()

    

}


const createLoginMail=(Email,Username,Password,Server)=>{

    var BodyMail=` Hi ${Email} 
     
    Please find the login credentials on ${Server}

    Username = ${Username}
    Password = ${Password}

    `
   console.log("Inside Create Login Mail")
    
    let transport = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        
        auth: {
           user: 'automation@caresmartz360.com',
           pass: 'zwnsyhgkhtcszwjz'
        },
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS: true

    });
    const message = {
        from: 'automation@caresmartz360.com', // Sender address
        to: [Email],         // List of recipients
        subject: 'Login Created', // Subject line
        text: BodyMail // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
         

        }
    });


}


const sentMail=(link,database,server,username,role,timeInterval,status,Email,Reason)=>{


   
							var maillist = [
							  'harman.saini@caresmartz360.com',
							  'harpreet.singh@caresmartz360.com',
							  'navjot.singh@caresmartz360.com',
							  'shailender.bhatia@caresmartz360.com',
							  'gaurav.setia@caresmartz360.com',
							  'mandeep.singh@caresmartz360.com',
							  'rashmi.singh@caresmartz360.com',
							  'pareena.sardarjeet@caresmartz360.com',
							  'pawan.kumar@caresmartz360.com',
							  'kshitij.vyas@caresmartz360.com',
							  'rohan.unvi@caresmartz360.com',
							  'ankur.banga@caresmartz360.com',
							  Email
							  
							];
							
    var BodyMail=` Hi,
     
    Please click on the link to give ${role} access to ${Email} on Database ${database} on server ${server} for ${timeInterval} hour
    
    Purpose: ${Reason}	
	 
      ${link}



    `
 
    
    let transport = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        
        auth: {
           user: 'automation@caresmartz360.com',
           pass: 'zwnsyhgkhtcszwjz'
        },
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS: true

    });

    const message = {
        from: 'automation@caresmartz360.com', // Sender address
        to: maillist,         // List of recipients
        subject: 'Database Access Request', // Subject line
        text: BodyMail // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
         

        }
    });


}


const approvedMail=(mailaddress,Role,Username,Database,Server,time,ApprovedBy)=>{
	
	var maillist = [
							  'harman.saini@caresmartz360.com',
							  'harpreet.singh@caresmartz360.com',
							  'shailender.bhatia@caresmartz360.com',
							  'harpreet.singh@caresmartz360.com',
							  'navjot.singh@caresmartz360.com',
							  'gaurav.setia@caresmartz360.com',
							  'mandeep.singh@caresmartz360.com',
							  'rashmi.singh@caresmartz360.com',
							  'pareena.sardarjeet@caresmartz360.com',
							  'pawan.kumar@caresmartz360.com',
							  'kshitij.vyas@caresmartz360.com',
							  'rohan.unvi@caresmartz360.com',
							  'ankur.banga@caresmartz360.com',
							 
							  mailaddress
							  
							];

    var BodyMail=` Hi ${mailaddress} 
     
    ${Role} has been assigned to ${Username} on ${Database} on ${Server} for ${time} hour by ${ApprovedBy}`
 
    
    let transport = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        
        auth: {
           user: 'automation@caresmartz360.com',
           pass: 'zwnsyhgkhtcszwjz'
        },
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS: true

    });

    const message = {
        from: 'automation@caresmartz360.com', // Sender address
        to: maillist,         // List of recipients
        subject: 'Database Access Request', // Subject line
        text: BodyMail // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
         

        }
    });

}

const updateRecord=async(id,approvedBy)=>{

    try {
        var dbconn = await mssql.connect(configco);

    } catch (error) {
        console.log(error)

        
        return res.json({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }

    console.log('Approvedby',approvedBy)
    var query1=`update dbo.DatabaseAccessLog set Status='active',ApprovedAt=GETUTCDATE(),ApprovedBy='${approvedBy}'  where RequestID='${id}'`
    try {
		const result= await new mssql.Request().query(query1)
        await dbconn.close()
        return ({
            "status":"Success",
            "Message":"Record updated successfully"
        })
	
		
	} catch (error) {
		await dbconn.close()
		console.log(error)
        return({
            "status":"Error",
            "Message":"Not able to Update record"
        })
	}

}

const insertRecord=async(req,res,next)=>{

    var {database,server,username,role,timeInterval,status,Email,Reason}=req.body
    
    var requestID=Math.floor(Math.random()*100000)
    console.log(req.body)
    try {
        var dbconn = await mssql.connect(configco);

    } catch (error) {
        console.log(error)

        
        return res.json({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }
    var query1=`insert  [dbo].[DatabaseAccessLog]([DatabaseName], [Server],[Username], [Role], [TimeInterval],  [Status],[RequestID],[Email],[Reason])
	Values('${database}','${server}','${username}','${role}','${timeInterval}','${status}','${requestID}','${Email}','${Reason}')`

    console.log(query1)
    try {
		const result= await new mssql.Request().query(query1)
        console.log(result)

        await dbconn.close()
        var link=`https://sqlaccess.caresmartz360.net/pendingrequests/${requestID}`
        sentMail(link,database,server,username,role,timeInterval,status,Email,Reason)
        return res.json({
            "status":"Success",
            "Message":"Record insert successfully"
        })
	
		
	} catch (error) {
		await dbconn.close()
		console.log(error)
        return res.json({
            "status":"Error",
            "Message":JSON.stringify(error)
        })
	}




}

// DatabaseName: 'Test',
//     Username: 'ankit',
//     Role: 'db_owner',
//     TimeInterval: 1,
//     ID: 6,
//     Status: 'pending',
//     ApprovedBy: 'Nishant',
//     Server: 'NTZ-LAP-083\\MSSQLSERVER01'

const grantAccess=async(req,res,next)=>{

    var {Email,DatabaseName,Username,Role,Server,TimeInterval}=req.body
   
    if(DatabaseName.length==0||Username.length==0||Role.length==0||req.body.Server.length==0){
        return res.json({
            "status":"Error",
            "Message":"Please fill all the fields"
        })
    }

    config={...config,server:req.body.Server}


    try {
        var dbconn = await mssql.connect(config);

    } catch (error) {
        console.log(error)

       
        
        return res.json({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }


    try {
        var request = new mssql.Request();
        request.input("Username", Username);
		
		
		 var resultdbowner=await request.query(`USE [${DatabaseName}]
        select IS_ROLEMEMBER('${Role}','${Username}') as result`)

        console.log(resultdbowner.recordset[0].result)
        

        if(resultdbowner.recordset[0].result==1){

           
            await dbconn.close()
            var updatestatus =await updateRecord(req.body.RequestID,req.body.ApprovedBy)
    
            approvedMail(Email,Role,Username,DatabaseName,Server,TimeInterval,req.body.ApprovedBy)
            
			console.log(`${Username} already has ${Role} on ${DatabaseName}`)
            return res.json({
                "status":"Success",
                "Message":`${Username} already has ${Role} on [${DatabaseName}]`
            })
        }
        else{

            resultdbowner=await request.query(`USE [${DatabaseName}]
            SELECT count(*) as result FROM sys.database_principals WHERE name ='${Username}'`)



        console.log("count",resultdbowner.recordset[0].result)

        if(resultdbowner.recordset[0].result){

            await request.query(`USE [${DatabaseName}]
            DROP USER "${Username}"`)

        }

        }
       
       

        console.log(`USE ${DatabaseName} CREATE USER ${Username} FOR LOGIN ${Username}`)
        var result=await request.query(`USE [${DatabaseName}]
		IF EXISTS (SELECT 1 FROM sys.database_principals WHERE name = '${Username}')
    BEGIN
        DROP USER [${Username}];
    END 
        CREATE USER "${Username}"  FOR LOGIN "${Username}"`)
		
		
		
		if(Role=='sp_execute'){
            var spresult=await request.query(`USE [${DatabaseName}]
            SELECT count(*) as count FROM sys.database_principals where type='R' and name='sp_execute'`)

            console.log("spresult",spresult.recordset[0].count)
            if(spresult.recordset[0].count!=1){
                
				console.log(`USE [${DatabaseName}]
                CREATE ROLE ${Role}
                GRANT EXECUTE TO ${Role}
				GRANT VIEW Definition TO ${Role}
                ALTER ROLE [db_datareader] ADD MEMBER "${Username}"`)
				
                var roleCreateResult=await request.query(`USE [${DatabaseName}]
               CREATE ROLE ${Role}
                GRANT EXECUTE TO ${Role}
			GRANT VIEW Definition TO ${Role}
                ALTER ROLE [db_datareader] ADD MEMBER "${Username}"`)

            }
        }
        
        try {
            var result=await new mssql.Request().query(`USE [${DatabaseName}]
			ALTER ROLE [db_datareader] ADD MEMBER "${Username}"
			ALTER ROLE [${Role}] ADD MEMBER "${Username}"`)
           
       
        await dbconn.close()

        var updatestatus =await updateRecord(req.body.RequestID,req.body.ApprovedBy)

        approvedMail(Email,Role,Username,DatabaseName,Server,TimeInterval,req.body.ApprovedBy)

        if(updatestatus.status=='Error' || updatestatus.status=='Success'){

             return res.json({
                "status":"Success",
                "Message":`${Role} assigned to ${Username}`
             })
            }
            
        } catch (error) {
            console.log(error)
            await dbconn.close()
            
            return res.json({
                "status":"Error",
                "Message":`Not able to assign ${Role} to User ${Username}`
            })
            
        }
        console.log(result)
    } catch (error) {
        console.log(error)
        await dbconn.close()
        
        return res.json({
            "status":"Error",
            "Message":`Not able to map  User ${Username}`
        })
        
    }


}


const checkLogins=async(req,res,next)=>{

    var {database,server,username,role,timeInterval,status,approvedBy,Email}=req.body

    config={...config,server:req.body.server}

    if(database.length==0||username.length==0||role.length==0||req.body.server.length==0||req.body.Reason==undefined){
        return res.json({
            "status":"Error",
            "Message":"Please fill all the fields"
        })
    }


    try {
        var dbconnlogin = await mssql.connect(config);

    } catch (error) {
        console.log(error)

       
        
        return res.json({
            "status":"Error",
            "Message":"Not able to connect"
        })
    }

    try {
        var query2="select name from sys.server_principals where type_desc='SQL_LOGIN' and principal_id>257"

        const resultlogin= await new mssql.Request().query(query2)
        console.log(resultlogin.recordset)

        var queryusername=resultlogin.recordset.find(
            (result)=>{
                return result.name==username
            }
        )
        console.log(queryusername)
        if(queryusername==undefined){
			
			try {

            let length = 5,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
		for (let i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}

            var Password= "CS360"+retVal+"*"
            

            console.log(Password)
            var result=await new mssql.Request().query(`USE [master]  
            CREATE LOGIN "${username}" WITH PASSWORD='${Password}'`)
            console.log(result)

            
               
           } catch (error) {

            console.log(error)
            return res.json(
                {
                    "status":"Error",
                     "Message":"Not able to create Login, Please mail to cloudops@netsmartz.com for creating the Login"
                }
            )
               
           }
			
            await dbconnlogin.close()
			createLoginMail(Email,username,Password,server)
        
            return res.json(
                {
                    "status":"Success",
                     "Message":"Login Created",
					 "Username":username,
					 "Password":Password
					 
                }
            )
        }
        else{
            await dbconnlogin.close()

            return res.json(
                {
                    "status":"Success",
                     "Message":"Login Exists"
                }
            )

        }

        
    } catch (error) {
        
    }



}

module.exports = {
    getDatabases,
    grantAccess,
    insertRecord,
    getPendingRequests,
    checkLogins
    
}