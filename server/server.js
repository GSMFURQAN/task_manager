import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import mongoose from 'mongoose';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { JWT_SECRET, MongoUrl } from './config.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

if(process.env.NODE_ENV !== 'production'){
  dotenv.config({path:'./server/.env'})
}

const port = process.env.PORT || 4000

console.log('peee',process.env.MongoUrl,process.env.JWT_SECRET)
mongoose.connect(process.env.MongoUrl,{})
mongoose.connection.on('connected',()=>{
  console.log('DB connected Sir')
})
mongoose.connection.on('error',(err)=>{
  console.log('DB connection failed Sir ', err)
})

import './models/User.js'
import './models/Car.js'
import './models/Task.js'
import './models/Category.js'
import { typeDefs } from './schemaGql.js';
import { resolvers } from './resolvers.js';

const context = ({ req }) => {
  const { authorization } = req.headers;
  console.log('dert',authorization)
  if (authorization) {
    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      return { userId };
    } catch (err) {
      console.log("Token verification failed:", err);
    }
  }
  return {};  // Return an empty object if no token or verification fails
};

const app = express()
const httpServer = http.createServer(app);


const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins:[
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV !=="production" ? 
      ApolloServerPluginLandingPageGraphQLPlayground() :
      ApolloServerPluginLandingPageDisabled()
  ]
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000', 'http://192.168.29.128:3000','https://task-manager-k6xq.onrender.com'], // Allow frontend origins
      // origin:'*',
      credentials: true, // Allow cookies or credentials
    },
  });

    // Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// if(process.env.NODE_ENV == 'production'){
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
//  }
 
  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  //   cors: {
  //     origin:'*', // Allow your frontend origin
  //     credentials: true, // Allow cookies or credentials
  //   },
  // });
  // console.log(`🚀 Server ready at ${url}`);

   // Start the Express server
   httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();