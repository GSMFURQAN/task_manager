import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    password:{
        type :String,
        required:true
    }
})

mongoose.model('User',userSchema )