import { gql } from 'apollo-server-express';

export default gql`
	type User {
		id: ID!
		email: String!
		name: String!
	}

	type AuthPayload {
		token: String!
		user: User!
	}

	type Query {
		me: User!
	}

	type Mutation {
		signup(email: String!, password: String!, name: String!): AuthPayload!
		login(email: String!, password: String!): AuthPayload!
	}
`;
