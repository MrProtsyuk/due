const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
//Apollo server
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Set up apollo server
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //integrate apollo server with express
  server.applyMiddleware({ app });
}

// Serve up static assets
//app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Mark: Edited this, if it doesnt work then comment it out!
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

startApolloServer(typeDefs, resolvers);