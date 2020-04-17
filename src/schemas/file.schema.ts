export const queries = `
  filesByCourse(input: FilesByCourseInput!): [File!]!
  files(input: FilesInput): [File!]!
`;

export const mutations = `
  addFileToCourse(input: AddFileToCourseInput!): File!
`;

export const types = `
  type File {
    _id: String!
    path: String!
    type: String!
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
    type: String!
    course: String!
  }
`;
