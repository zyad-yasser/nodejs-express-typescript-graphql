export const queries = `
  filesByCourse(input: FilesByCourseInput!): [Course!]!
  files(input: FilesInput): Course!
`;

export const mutations = `
  addFileToCourse(input: AddFileToCourseInput!): File!
`;

export const types = `
  type File {
    path: String!
    Type: String!
    course: String!
  }

  input FilesByCourseInput {
    skip: Int!
    limit: Int!
    course: String!
  }

  input FilesInput {
    skip: Int!
    limit: Int!
  }

  input AddFileToCourseInput {
    path: String!
    Type: String!
    course: String!
  }
`;
