const mongoose = require('mongoose');

 mongoose.connect("mongodb://localhost:27017/UserRegister",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Database connected succesfully")
}).catch((err)=>{
    console.log("Error in Connection with database " +err);
})