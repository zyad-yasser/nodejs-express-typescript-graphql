export const queries = `
  login(input: LoginInput!): AuthData!
  register(input: RegisterInput!): AuthData!
`;

export const mutations = `
	logout: Logout!
	me: AuthData!
`;

export const types = `
  type AuthData {
    tokens: Tokens!
    user: User!
  }

  type Logout  {
    isLoggedout: Boolean!
	}

  type Tokens {
    authToken: String!
    refreshToken: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;
