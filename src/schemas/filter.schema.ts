export const queries = `
  listFilters: [Filter!]!
`;

export const mutations = `
  createFilter(input: FilterInput!): [Filter!]!
`;

export const types = `
  type Filter {
    key: String!
    value: String!
  }

  type FilterInput {
    key: String!
    value: String!
  }
`;
