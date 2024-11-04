import mongoose from "mongoose";
import { userResolvers } from "./gqlResolvers/userResolver.js";
import { taskResolvers } from "./gqlResolvers/taskResolver.js";
import { categoryResolver } from "./gqlResolvers/categoryResolver.js";
import merge from "lodash.merge";

export const resolvers = merge({}, userResolvers, taskResolvers, categoryResolver);