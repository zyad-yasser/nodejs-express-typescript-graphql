export const queries = `
  login(email: String!, password: String!): AuthData!
  register(email: String!, password: String!, firstName: String!, lastName: String!): AuthData!
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
`;
