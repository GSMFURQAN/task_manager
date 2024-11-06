import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemaGql.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, MongoUrl } from './config.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import './models/User.js';
import './models/Car.js';
import './models/Task.js';
import './models/Category.js';
import { resolvers } from './resolvers.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = process.env.PORT || 4000;

mongoose.connect(MongoUrl, {})
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB connection failed:', err));

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
  return {};
};

const app = express();
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
    cors: false
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

startServer();
