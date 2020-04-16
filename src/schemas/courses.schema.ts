export const queries = `
  courses: [Course!]!
  lesson(id: String!): Lesson!
  myCourses: [Course!]!
`;

export const mutations = `

`;

export const types = `
  type UserSlim {
    name: String!
    tag: String!
    storiesAvailable: Int!
  }

  type Lesson {
    name: String!
    duration: Int!
    createdAt: String!
    updatedAt: String!
    likes: [String]!
    dislikes: [String]!
    description: String!
    path: String!
    course: Course!
  }

  type Course {
    name: String!
    createdAt: String!
    updatedAt: String!
    description: String!
    user: UserSlim!
    lessons: [Lesson]!
  }
`;
