export const typeDefs = `#graphql
  type Query {
    user(userId:ID!): User!
    allUsers: [User!]!
    me:User!
  }

  type Mutation {
    userSignUp(name:String!,email:String!,password:String!):authRes!
    userSignIn(email:String!,password:String!):authRes!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  type authRes {
    code: Int!
    message:String!
    token:String
  }
`;
