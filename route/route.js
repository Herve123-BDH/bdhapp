const express=require('express')
const route = express.Router()
const Authcontroller= require("../controller/Authcontroller")

route.post('/newpost', Authcontroller.newpost)
route.get('/allpost', Authcontroller.allpost)
route.get('/onepost/:id', Authcontroller.onepost)
route.delete('/delete/:id', Authcontroller.deletepost)
route.patch('/updatepost/:id', Authcontroller.updatepost)



module.exports=route