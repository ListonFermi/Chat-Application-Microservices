const mongoose=require('mongoose')

dbConnect=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then( ()=>console.log('User service mongodb database connected') )
    .catch( (err)=>console.log(err) )
}

module.exports= dbConnect