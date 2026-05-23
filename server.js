const express=require('express')
const colors=require('colors')
const cors=require('cors')
var fs=require('fs')
var https = require('https')
require('log-timestamp');
//custom modules

const sqlAccessRoutes=require('./routes/sqlAccess')




const app=express()



//Use body-parser
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Use info routes
app.use(sqlAccessRoutes)



app.get("/",(req,res)=>{
    res.send("<h1>hello from nodejs</h1>")
})

// app.listen(5000,()=>{
//    console.log("hello from nodejs".green.inverse)
// })





https.createServer({
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
}, app)
.listen(5001, function () {
  console.log('Example app listening on port 5001! Go to https://localhost:5000/')
})