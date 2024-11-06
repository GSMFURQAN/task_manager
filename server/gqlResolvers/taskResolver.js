import mongoose from "mongoose";
import dayjs from "dayjs";

const User = mongoose.model("User");
const Task = mongoose.model("Task");

export const taskResolvers = {
  Query: {
    tasks: async (_, { _id }) => await Task.find({ userId: _id }),
    filteredTasks: async (_, { category, fromDate, toDate }, userId) => {
      const query = {};

      if (category == "Today") {
        query.dueDate = {
          $gt: dayjs().startOf("day").toDate(),
          $lt: dayjs().endOf("day").toDate(),
        };
      } else {
        if (category !== "Today") {
          query.category = category;
        }
        if (fromDate || toDate) {
          query.dueDate = {
            ...(fromDate && { $gt: new Date(fromDate) }),
            ...(toDate && { $lt: new Date(toDate) }),
          };
        }
      }
      console.log("dexx", category, fromDate, toDate, query);
      const tasks = await Task.find({
        ...query,
      }).sort({ dueDate:1 });
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
      console.log("fexx", newTask);
      const task = new Task({
        ...newTask.taskDetails,
        // dueDate: new Date(newTask.taskDetails.dueDate).toISOString(),
        userId,
      });
      await task.save();
      return { message: "Task created successfully", data: task };
    },

    completeTask: async (_, { taskvalues }, userId) => {
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      console.log("tex", taskvalues);
      const newTask = await Task.updateOne(
        { _id: taskvalues._id },
        { $set: { done: taskvalues.done } }
      );
    },

    editTask: async (_, { task }, userId) => {
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      const newTask = await Task.updateOne(
        { _id: task._id },
        { $set: { ...task.taskDetails } }
      );
    },

    deleteTask: async (_, { _id }, userId) => {
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      const newTask = await Task.findByIdAndDelete(_id);
    },
  },
};
