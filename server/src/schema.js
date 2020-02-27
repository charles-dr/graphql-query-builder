const { gql } = require('apollo-server');
module.exports = gql`
    type User {
        id: Int!
        name: String
        email: String
        organizations: [Organization]
    }

    type Organization {
        id: Int!
        name: String
        userIds: [Int]
        users: [User]
    }

    type Query {
        users: [User]
        user(id: Int!): User

        organizations: [Organization]
        organization(id: Int!): Organization
    }
`