require('./registerModel');
const mongoose=require('mongoose');
var productSchema=mongoose.Schema({
    pname:{
        type:String,
        required:[true,'Product should be enterd']
    },
    price:{
      type:String,
      required:[true,'Price should be entered']
    },
    quantity:{
        type:Number,
        required:[true,'Quantity should be entered']
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userRegister'   
        //this is the reference to the userModel
    }

})
mongoose.model('product',productSchema)
// 'product is the name of our model'