const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
  userName:{
    type:String,
    required:true,
    trim:true,
  },

  email:{
    type:String,
    required:true,
    trim:true,
    validate:{
      validator:(value)=>{
        const result= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return result.test(value);
      },
      message:'Please enter a valid email address',
    }
  },

  state:{
    type:String,
    default:'',
  },

  city:{
    type:String,
    default:'',

  },

  locality:{
    type:String,
    default:'',

  },

  password:{
    type:String,
    required:true,
    validate:{
      validator:(value)=>{
        return value.length>=8
      },
      message:'Password must be atleast 8 characters long',
    }
  },


});

const User=mongoose.model('users',userSchema)

module.exports=User;