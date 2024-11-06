import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemaGql.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, MongoUrl } from './config.js';
import dotenv from 'dotenv'
import './models/User.js';
import './models/Car.js';
import './models/Task.js';
import './models/Category.js';
import { resolvers } from './resolvers.js';
import path from 'path'
import { fileURLToPath } from 'url';



if(process.env.NODE_ENV !== 'production'){
  dotenv.config()
}
const port = process.env.PORT || 4000
// Connect to MongoDB
mongoose.connect(process.env.MongoUrl, {})
  .then(() => console.log('DB connected Sir'))
  .catch(err => console.log('DB connection failed Sir ', err));

// Context middleware for authorization
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

// Initialize Express app
const app = express();

// Set up Apollo Server with Express
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000', 'http://192.168.29.128:3000'], // Allow frontend origins
      credentials: true, // Allow cookies or credentials
    },
  });


  // Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  // if we're in production serve build/index.html file on local server
//  if(process.env.NODE_ENV == 'production'){
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
//  }

  // Start the Express server
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
