import { typeDefs } from "@/lib/utils/graphql";
import { useCSRFPrevention as CSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";
import { sql } from "@vercel/postgres";
import { createSchema, createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs,
    resolvers: {
      Query: {
        getAllNotes: async () => {
          const result = await sql`SELECT * FROM notes;`;
          return result.rows;
        },
        getNote: async (_, args) => {
          const result = await sql`SELECT * FROM notes WHERE id = ${args.id}`;
          return result.rows[0];
        },
      },
      Mutation: {
        addNote: async (_, args) => {
          const { title, body } = args;
          await sql`INSERT INTO notes(title, body) VALUES(${title}, ${body});`;

          return {
            statusCode: 200,
            message: "Success create note!",
          };
        },
        editNote: async (_, args) => {
          const { id, title, body } = args;
          await sql`UPDATE notes SET title = ${title}, body = ${body} WHERE id = ${id}`;

          return {
            statusCode: 200,
            message: "Success update note!",
          };
        },
        deleteNote: async (_, args) => {
          const { id } = args;
          await sql`DELETE FROM notes WHERE id = ${id}`;

          return {
            statusCode: 200,
            message: "Success delete note!",
          };
        },
      },
    },
  }),
  fetchAPI: {
    Response: Response,
    Request: Request,
  },
  plugins: [
    /**
     * @see https://the-guild.dev/graphql/yoga-server/docs/features/csrf-prevention
     */
    CSRFPrevention({
      requestHeaders: ["x-graphql-yoga-csrf"],
    }),
  ],
  batching: true,
});

export { handleRequest as GET, handleRequest as POST };
