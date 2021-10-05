const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false,
        // unique:true
    },
    password:{
        type:String,
        required:false
    },
    confirmpassword:{
        type:String,
        required:false
    }
})

// creating collections

const Register = new mongoose.model("Register",userSchema)
module.exports = Register;