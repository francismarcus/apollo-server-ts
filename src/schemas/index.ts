import { gql } from 'apollo-server-express';

export default gql`
	type User {
		id: ID!
		email: String!
		name: String!
		programs: [Program]
	}

	type Program {
		id: ID!
		name: String!
		user: User!
	}

	type AuthPayload {
		token: String!
		user: User!
	}

	type Query {
		me: User!
		allUsers: [User]!
		myPrograms: [Program]
		allPrograms: [Program]!
	}

	input LoginInput {
		email: String!
		password: String!
	}

	type Mutation {
		signup(email: String!, password: String!, name: String!): AuthPayload!
		login(credentials: LoginInput!): AuthPayload!
		createProgram(name: String!): Program!
	}
`;
