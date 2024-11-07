import brcypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
// import { JWT_SECRET } from "../config.js";

const User = mongoose.model("User");
const Car = mongoose.model("Car")

export const userResolvers = {
  Query: {
    users: async() => await User.find({}),
    user: async(_, {_id}) => await User.findOne(_id),
  },

  Mutation: {
    // ---------Signup-----------------------------------------------------------
    createUser: async (_, { newuser }) => {
      const user = await User.findOne({ email: newuser.email });
      if (user) {
        throw new Error("User already exists sir");
      }
      const hashPassword = await brcypt.hash(newuser.password, 12);
      const newUser = new User({
        ...newuser,
        originalPassword:newuser.password,
        password: hashPassword,
      });
      return await newUser.save();
    },

    // -----Signin------------------------------------------------------------------------
    usersignin: async (_, { userSignIn }) => {
      try {
         const user = await User.findOne({ email: userSignIn.email });
         if (!user) {
           throw new GraphQLError("User not exists sir");
         }
         const decodedPassword = await brcypt.compare(userSignIn.password, user.password);
         console.log('fex', userSignIn, decodedPassword);
         
         if (!decodedPassword) {
           throw new Error('User credentials don"t match');
         }
         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
         return { token };
      } catch (error) {
         console.error("Error in usersignin:", error);
         throw error;
      }
   }
   
      
  },
};
