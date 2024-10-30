import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schemaGql.js';
import mongoose from 'mongoose';
import { JWT_SECRET, MongoUrl } from './config.js';
import jwt from 'jsonwebtoken'

mongoose.connect(MongoUrl,{})

mongoose.connection.on('connected',()=>{
  console.log('DB connected Sir')
})

mongoose.connection.on('error',(err)=>{
  console.log('DB connection failed Sir ', err)
})

import './models/User.js'
import './models/Car.js'
import { resolvers } from './resolvers.js';

const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const { userId } = jwt.verify(authorization, JWT_SECRET);
      return { userId };
    } catch (err) {
      console.log("Token verification failed:", err);
    }
  }
  return {};  // Return an empty object if no token or verification fails
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
