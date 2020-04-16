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

  type FilesByCourseInput {
    skip: Int!
    limit: Int!
    course: String!
  }

  type FilesInput {
    skip: Int!
    limit: Int!
  }

  type AddFileToCourseInput {
    path: String!
    Type: String!
    course: String!
  }
`;
