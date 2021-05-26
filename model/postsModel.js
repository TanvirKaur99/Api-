require('./registerModel');
const mongoose=require('mongoose');
 var postSchema=mongoose.Schema({
     
    question:{
        type:String,
        required:[true,'Post should be enterd']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userRegister'   
        //this is the reference to the registerModel
    }

 })

 mongoose.model('QPost',postSchema);