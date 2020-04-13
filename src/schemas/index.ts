import { buildSchema } from 'graphql';

export const schema: any = buildSchema(
  `
    schema {
      query: RootQuery
      mutation: RootMutation
    }

    type RootQuery {
      courses: [Course!]!
      lesson(id: String!): Lesson!
      login(email: String!, password: String!): AuthData!
      register(email: String!, password: String!, firstName: String!, lastName: String!): AuthData!
      myCourses: [Course!]!
    }

    type RootMutation {
      logout: Boolean!
    }

    type AuthData {
      user: User!
      tokens: Tokens!
    }

    type Tokens {
      authToken: String!
      refreshToken: String!
    }

    type UserSlim {
      name: String!
      tag: String!
      storiesAvailable: Int!
    }

    type User {
      firstName: String!
      lastName: String!
      email: String!
      mobile: String!
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
