export const queries = `
  courses(input: CoursesInput!): [Course!]!
  course(id: String): Course!
  coursesByIds(ids: [String!]!): [Course!]!
  myCourses: [Course!]!
  publishedCourses: [Course!]!
`;

export const mutations = `
  createCourse(input: CreateCourseInput!): Course!
  buyCourse(input: BuyCourseInput!): BuyStatus!
`;

export const types = `
  type Course {
    _id: String!
    createdAt: String!
    updatedAt: String!
    name: String!
    description: String!
    filters: [Filter!]
    user: UserSlim!
    image: String
  }

  type BuyStatus {
    isBought: Boolean!
  }

  input CreateCourseInput {
    name: String!
    description: String!
    image: String
    filters: [FilterInput!]
  }

  input BuyCourseInput {
    course: String!
  }

  input CoursesInput {
    search: String
    skip: Int!
    limit: Int!
    sortColumn: String
    sortType: String
    filters: [FilterInput!]
  }

  type Filter {
    key: String!
    value: String!
  }

  input FilterInput {
    key: String!
    value: String!
  }
`;
