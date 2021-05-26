require('../model/registerModel');//import registerModel.js file
require('../config/passportConfig');//import passportConfig.js file
require('../model/productModel');//import product model
require('../model/postsModel');//import posts model
//require('../model/profileImageModel');//importing profileImage model
require('../model/productImage');
require('../model/answerModel');//import answer model
require('../model/addcredModel');//AddCredentials Model

const mongoose = require('mongoose');

const passport = require('passport');

const jwt = require('jsonwebtoken');

const multer=require('multer');





var UserData=mongoose.model('userRegister');//'UserData' object created for userRegister Model

var newProduct=mongoose.model('product');//'newProduct' is the reference to the product Model

var newPost=mongoose.model('QPost');//newPost is the reference to the Qpost Model 

//var profileImages= mongoose.model('profileImage');//profileImages is the reference to the profileimage

var productImages= mongoose.model('productimage');

var ansPost=mongoose.model('AnsPost') //ansPost is the refrence to the AnsPost Model

var credData=mongoose.model('addcredentials');




//Function for Adding new user or register a user
module.exports.addnew=(req,res)=>{
    var myData=new UserData({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password,
    });
    myData.save().then((docs)=>{
        return res.status(200).json({
            message:'Data inserted successfully',
            success:true,
            data:docs 
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            message:'Error in adding new user',
            success:false,
            error:err.message
        })
    });
}

//to check authentication :if user is registered it will generate token

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'1000m'}),
            "user":user
        });
        if(info) return res.status(401).json(info);
    })(req,res,next)
}

//for selecting a userid 
module.exports.selectedUser=(req,res)=>{
    UserData.findById({_id:req.params.id}).then((docs)=>{
        return res.status(200).json({
          success:true,
          message:'user found',
          data:docs
        })
      })
      .catch((err)=>{
       return res.status(400).json({
         success:false,
         message:'User not found',
         error:err.message
    
       })
      })
    }

//adding new product to the database
module.exports.addnewproduct=(req,res)=>{
    var myproduct=new newProduct({
      pname:req.body.pname,
      price:req.body.price,
      quantity:req.body.quantity,
      user:req.body.user
    });
  
      myproduct.save().then((docs)=>{
        return res.status(200).json({
          success:true,
          message:"New Product added",
          data:docs
        })
      })
      .catch((err)=>{
        return res.status(400).json({
          success:false,
          message:'Error in adding product',
          error:err.message
        })
      })
    }

//display product by user

module.exports.displayproduct=(req,res)=>{
    return newProduct.find({user:req.params.userid}).populate('user').exec().then((docs)=>{
      res.status(200).json({
        success:true,
        message:'list of products added',
        data:docs
      })
    })
    .catch((err)=>{
      res.status(404).json({
        success:false,
        message:'No product found',
        error:err.message
      })
    })
  }

// for adding a new Post
  module.exports.addnewPost=(req,res)=>{
    var mypost=new newPost({
      question:req.body.question,   
      user:req.body.user
    });
  
      mypost.save().then((docs)=>{
        return res.status(200).json({
          success:true,
          message:"New Post added",
          data:docs
        })
      })
      .catch((err)=>{
        return res.status(400).json({
          success:false,
          message:'Error in adding Post',
          error:err.message
        })
      })
    }

    //display all posts added by the  particular user

module.exports.displaypost=(req,res)=>{
  return newPost.find({user:req.params.userid}).populate('user').exec().then((docs)=>{
    res.status(200).json({
      success:true,
      message:'list of questions added',
      data:docs
    })
  })
  .catch((err)=>{
    res.status(404).json({
      success:false,
      message:'No question found yet',
      error:err.message
    })
  })
}

//for updating data
module.exports.updatedData=(req,res)=>{
    
  var updatedData = req.body;
  UserData.findByIdAndUpdate({_id:req.params.id},{$set:updatedData},{new:true})
  .then((docs)=>{
      return res.status(200).json({
          success:true,
          message:'Data updated',
          data:docs
      })
      
          }).catch((err)=>{
              return res.status(401).json({
                  success:false,
                  message:'Error in updating data',
                  err:err.message
      })
  })
}



//for displaying....

module.exports.displayfile=(req,res)=>{
  res.sendFile(__dirname+"/views/file.html");

}

  //for uploading images

  var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname);
    }
  })

  var upload = multer({storage:storage}).single('photo');


  module.exports.uploadImage = (req,res)=>{
    upload(req,res,(err)=>{
      if(err)
      console.log("Error in uploading file" +err);
      else{
        console.log("File uploaded successfully");

          var myprodimg=new productImages({
            product:req.params.productid,
            imagepath:req.file.path

          });

          myprodimg.save().then((docs)=>{
            return res.status(200).json({
              success:true,
              message:'Uploaded successfully',
              data:docs
            })
          }).catch((err)=>{
            return res.status(404).json({
              success:false,
              message:'Error in Uploading file',
              error:err.message
            })
          })

        console.log(req.file);

      }

    })
  }




  //for selecting a quesid 
module.exports.selectedQues=(req,res)=>{
  newPost.findById({_id:req.params.id}).then((docs)=>{
      return res.status(200).json({
        success:true,
        message:'question found',
        data:docs
      })
    })
    .catch((err)=>{
     return res.status(400).json({
       success:false,
       message:'question not found',
       error:err.message
  
     })
    })
  }

  // for adding a new Answer
  module.exports.addnewAnswer=(req,res)=>{
    var answer=new ansPost({
      answer:req.body.answer,
      quesid:req.body.quesid,   
      userid:req.body.user
    });
  
      answer.save().then((docs)=>{
        return res.status(200).json({
          success:true,
          message:"New Answer added",
          data:docs
        })
      })
      .catch((err)=>{
        return res.status(400).json({
          success:false,
          message:'Error in adding Answer',
          error:err.message
        })
      })
    }

  //  for displaying all the answers by a particular user
    module.exports.displayAnsPost=(req,res)=>{
      return ansPost.find({quesid:req.params.quesid}).populate('quesid').exec().then((docs)=>{
        res.status(200).json({
          success:true,
          message:'list of answers added',
          data:docs
        })
      })
      .catch((err)=>{
        res.status(404).json({
          success:false,
          message:'No answers found yet',
          error:err.message
        })
      })
    }

//for aading credentials
    module.exports.addcredentials=(req,res)=>{
      var credentials=new credData({
        location:req.body.location,
        dateofbirth:req.body.dateofbirth,
        education:req.body.education,
        address:req.body.address,
        profile:req.body.profile,
        workexperience:req.body.workexperience,
        user:req.body.user
      });
      credentials.save().then((docs)=>{
     return res.status(200).json({
      success:true,
      message:'credentials added successfully',
      data:docs
    
     })
      }).catch((err)=>{
        return res.status(400).json({
          success:false,
          message:'error in adding',
          error:err.message
      })
    })
    }
  


