const mongoose=require("mongoose")
const MONGO_URI=process.env.MONGO_URI
const MongoDB= async ()=>{
    try{
        const connection = await mongoose.connect(MONGO_URI,
            {useNewUrlParser: true,
            useUnifiedTopology: true
            })
        console.log(`server connected to the database`)
    }
    catch(err){
        console.log(err)
        process.exit()
    }
}
module.exports=MongoDB