import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    userId:{
        type :String,
        required:true
    },
})

mongoose.model('Category', categorySchema);
