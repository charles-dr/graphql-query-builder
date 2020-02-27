const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');


const server = new ApolloServer({
    typeDefs,
    resolvers
});

const port = process.env.PORT || 4000;

server.listen(port).then(({ url }) => {
    console.log(`🚀 [GraphQL] Server ready at ${url}`);
});