const express=require('express')
const router=express.Router()

const {getDatabases,grantAccess,insertRecord, getPendingRequests,checkLogins}=require('../controller/sqlAccess')


router.post('/api/getDatabases',getDatabases)
router.post('/api/grantAccess',grantAccess)
router.post('/api/insertRecord',insertRecord)
router.get('/api/getPendingRequests',getPendingRequests)
router.post('/api/checkLogins',checkLogins)



module.exports=router