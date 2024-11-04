import mongoose from "mongoose";


const User = mongoose.model("User");
const Task = mongoose.model("Task")

export const taskResolvers = {
  Query: {
    tasks: async(_, {_id}) => await Task.find({userId:_id}),
  },

  Mutation: {
    // ----Create Task-------------------------------------------------------------------------------
    createTask: async (_, newTask, userId) => {
       console.log("User ID in createCar:", userId);  // Log userId in the resolver
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      const task = new Task({
        newTask,
        userId
      });
      await task.save();
      return {message:"Task created successfully",data:task};
    }
  },
};
