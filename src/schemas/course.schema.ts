export const queries = `
  courses(input: CoursesInput!): [Course!]!
  course(id: String): Course!
  coursesByIds(ids: [String!]!): [Course!]!
  myCourses: [Course!]!
`;

export const mutations = `
  createCourse(input: CreateCourseInput!): Course!
`;

export const types = `
  type Course {
    createdAt: String!
    updatedAt: String!
    name: String!
    description: String!
    filters: [Filter!]
    user: UserSlim!
  }

  type CreateCourseInput {
    name: String!
    createdAt: String!
    updatedAt: String!
    description: String!
    user: String!
  }

  type CoursesInput {
    search: String
    skip: Int!
    limit: Int!
    sortColumn: String
    sortType: String
    filters: [Filter!]
  }

  type Filter {
    key: String!
    value: String!
  }

  type File {
    key: String!
    value: String!
  }
`;
