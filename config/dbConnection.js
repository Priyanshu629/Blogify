const mongoose=require('mongoose')
require('dotenv').config()
const MongoDb_Url=process.env.MONGODB_URI
  const  dbConnect = ()=> mongoose.connect(MongoDb_Url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Db connection success")
})
.catch((err)=>{
    console.log(err)
})

module.exports=dbConnect
