export const queries = `
  lesson(id: String!): Lesson!
  liveLessons: [Lesson!]!
  lessonsByCourse(course: String!): [Lesson!]!
`;

export const mutations = `
  like(lesson: String!): Liked!
  dislike(lesson: String!): Disliked!
  createLesson(input: CreateLessonInput): Lesson!
`;

export const types = `
  type Lesson {
    name: String!
    duration: Int!
    createdAt: String!
    updatedAt: String!
    likes: [String]!
    dislikes: [String]!
    description: String!
    user: UserSlim
    isLive: Boolean!
  }

  type Liked {
    isLiked: Boolean!
  }

  type Disliked {
    isDisliked: Boolean!
  }

  input CreateLessonInput {
    name: String!
    duration: Int!
    description: String!
    source: String!
    course: String
    isLive: Boolean!
  }
`;
