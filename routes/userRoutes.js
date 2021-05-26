var express = require('express');
var myctrl = require('../controller/userController');

var approute=express.Router();

approute.post('/newUser',myctrl.addnew);//for registering a new user
approute.post('/authentication',myctrl.authenticate);//for authenticating a user
approute.get('/userinfo/:id',myctrl.selectedUser);//for finding the id of a particular user
approute.post('/addproduct',myctrl.addnewproduct);//for adding a new product
approute.get('/displayproduct/:userid',myctrl.displayproduct);
approute.post('/addnewpost',myctrl.addnewPost);//for adding a post
approute.get('/displaypost/:userid',myctrl.displaypost);//for displaying all the posts by a particular user
approute.get('/file',myctrl.displayfile);
//approute.post('/imageupload',myctrl.uploadImage);//for uploading product images for particular product

approute.put('/updateRecord/:id',myctrl.updatedData);//for updating the user record
approute.get('/queinfo/:id',myctrl.selectedQues);//for finding a selected question

approute.post('/addnewAnswer',myctrl.addnewAnswer);//for adding a answer
approute.get('/displayAns/:quesid',myctrl.displayAnsPost);//for displaying all the posts by a particular user

approute.post('/addcred',myctrl.addcredentials);


module.exports = approute;