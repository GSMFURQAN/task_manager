import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    email:{
        type :String,
        required:true
    },
    originalPassword:{
        type :String,
        required:false
    },
    password:{
        type :String,
        required:true
    }
})

mongoose.model('User',userSchema )