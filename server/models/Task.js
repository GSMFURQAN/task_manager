import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
    task:{
        type :String,
        required:true
    },
    note:{
        type :String,
        required:false
    },
    dueDate:{
        type: Date,
        required:true
    },
    done:{
        type: Boolean,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    userId:{
        type: String,
        required:true
    },
  
})

mongoose.model('Task', taskSchema);
