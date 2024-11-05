import mongoose from "mongoose";

const User = mongoose.model("User");
const Task = mongoose.model("Task");

export const taskResolvers = {
  Query: {
    tasks: async (_, { _id }) => await Task.find({ userId: _id }),
    filteredTasks: async (_, { category, fromDate, toDate }, userId) => {
      const query = {};

      if (category) {
        query.category = category;
      }
      if(fromDate||toDate){ 
        query.dueDate= {
          ...fromDate &&{ $gt: new Date(fromDate)},
          ...toDate &&{ $lt: new Date(toDate)},
        }
      }
      const tasks = await Task.find({
        ...query,
      });
      return tasks;
    },
  },

  Mutation: {
    // ----Create Task-------------------------------------------------------------------------------
    createTask: async (_, { newTask }, userId) => {
      console.log("User ID in createCar:", userId); // Log userId in the resolver
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      const task = new Task({
        ...newTask,
        dueDate: new Date(newTask.dueDate).toISOString(),
        userId,
      });
      await task.save();
      return { message: "Task created successfully", data: task };
    },

    completeTask: async(_,{taskvalues},userId)=>{
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      console.log("tex",taskvalues);
      const newTask = await Task.updateOne({ _id: taskvalues._id }, { $set: { done: taskvalues.done } });

    }
  },
};
