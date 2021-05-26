  
const mongoose=require('mongoose');
require('./registerModel');

var addcredSchema=mongoose.Schema({
   location:{
     type:String
   },
   dateofbirth:{
     type:Date
   },
   address:{
     type:String
   },
   education:{
     type:String
   },
   profile:{
     type:String
   },
   workexperience:{
     type:String
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'userRegister'
  }



});

mongoose.model('addcredentials',addcredSchema);