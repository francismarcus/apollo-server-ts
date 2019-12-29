import { gql } from 'apollo-server-express'

export default gql`
type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
}

type AuthPayload {
  token: String!
  user: User!
}

type Query {
    hi: String!
}
type User {
  id: ID!
  email: String!
  name: String!
}
`

