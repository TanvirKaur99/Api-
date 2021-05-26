require('./registerModel');
require('./postsModel');
const mongoose=require('mongoose');
 var answerSchema=mongoose.Schema({
      answer:{
        type:String,  
      },
    quesid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'QPost'
    },
    
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userRegister'   
       
    }
 })

 mongoose.model('AnsPost',answerSchema);