import mongoose, { mongo } from "mongoose";

const carSchema = new mongoose.Schema({
    carname:{
        type :String,
        required:true
    },
  
})

mongoose.model('Car', carSchema);
