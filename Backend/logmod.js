const mongoose=require('mongoose');


const Joi = require('joi');





const loginSchema=new mongoose.Schema({
    Username:{type:String,required:true,minlength:3,maxlength:40
        //now we had to create a model


    },
    email:{type:String,required:true,minlength:5,maxlength:255},
    password:{type:String,required:true,minlength:5,maxlength:1024}     
})

  const Login= mongoose.model('Login',loginSchema);



function validateDetails(details) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(details);
}

  exports.Login=Login;

  exports.validate=validateDetails;
  //to get the category from the category schema we are exporting this
  exports.loginSchema=loginSchema;