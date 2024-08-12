import { gql } from "graphql-request";

export const typeDefs = `
  scalar Date

  type Note {
    id: ID!
    title: String!
    body: String!
    createdAt: Date!
  }

  type MutationResponse {
    statusCode: Int!
    message: String!
  }

  type Query {
    getAllNotes: [Note!]!
    getNote(id: ID!): Note!
  }

  type Mutation {
    addNote(title: String!, body: String!): MutationResponse
    editNote(id: ID!, title: String!, body: String!): MutationResponse
    deleteNote(id: ID!): MutationResponse
  }
`;

export const GetAllNotesSchema = gql`
  query {
    getAllNotes {
      id
      title
      body
      createdAt
    }
  }
`;

export const GetNoteSchema = (id: string) => gql`
  query {
    getNote(id: "${id}") {
      id
      title
      body
      createdAt
    }
  }
`;

export const AddNoteSchema = (title: string, body: string) => gql`
  mutation {
    addNote(title: "${title}", body: """${body}""") {
      statusCode
      message
    }
  }
`;

export const EditNoteSchema = (id: string, title: string, body: string) => gql`
  mutation {
    editNote(id: "${id}", title: "${title}", body: """${body}""") {
      statusCode
      message     
    }
  }
`;

export const DeleteNoteSchema = (id: string) => gql`
  mutation {
    deleteNote(id: "${id}") {
      statusCode
      message     
    }
  }
`;
