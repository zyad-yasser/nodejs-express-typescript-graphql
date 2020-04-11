import { buildSchema } from 'graphql';

export const schema: any = buildSchema(
  `
    schema {
      query: RootQuery
    }

    type RootQuery {
      courses: [Course!]!
      lesson(id: String!): Lesson!
      myCourses: [Course!]!
    }

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
    },

    type Course {
      name: String!
      createdAt: String!
      updatedAt: String!
      description: String!
      user: UserSlim!
      lessons: [Lesson]!
    }
  `);
