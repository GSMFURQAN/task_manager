import brcypt from "bcryptjs";
import mongoose from "mongoose";
import { JWT_SECRET } from "./config.js";
import jwt from 'jsonwebtoken'


const User = mongoose.model("User");
const Car = mongoose.model("Car")

export const resolvers = {
  Query: {
    users: async() => await User.find({}),
    user: async(_, args) => await User.findOne(_id),
    cars: async() => await Car.find({}),
    usercars: async(_, args) => await Car.findOne(_id),
  },

  User: {
    cars: async(user) => await Car.find({id: user._id}),
  },

  Mutation: {
    // ---------Signup-----------------------------------------------------------
    createUser: async (_, { newuser }) => {
      const user = await User.findOne({ name: newuser.name });
      if (user) {
        throw new Error("User already exists sir");
      }
      const hashPassword = await brcypt.hash(newuser.password, 12);
      const newUser = new User({
        ...newuser,
        password: hashPassword,
      });
      return await newUser.save();
    },

    // -----Signin------------------------------------------------------------------------
    usersignin: async (_, { userSignIn }) => {
      const user = await User.findOne({ name: userSignIn.name });
      if (!user) {
        throw new Error("User not exists sir");
      }
      const decodedPassword = await brcypt.compare(
        userSignIn.password,
        user.password
      );
      if (!decodedPassword) {
        throw new Error('User credentials doesn"t match');
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },

    // ----Create Car-------------------------------------------------------------------------------
    createCar: async (_, { carname }, context) => {
      const { userId } = context;  // Access userId from context here
       console.log("User ID in createCar:", context);  // Log userId in the resolver
      if (!userId) {
        throw new Error("You're not logged in!");
      }
      const newCar = new Car({
        carname,
        userId
      });
      await newCar.save();
      return "Car created successfully";
    }
      
  },
};
