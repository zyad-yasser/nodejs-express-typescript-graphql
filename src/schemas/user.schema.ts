export const queries = `

`;

export const mutations = `

`;

export const types = `
  type UserSlim {
    _id: String!
    firstName: String!
    lastName: String!
    tag: String!
    image: String
  }

  type User {
    _id: String!
    firstName: String!
    lastName: String!
    email: String!
    image: String
    mobile: String!
    tag: String!
  }
`;
