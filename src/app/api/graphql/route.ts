import { typeDefs } from "@/lib/utils/graphql";
import { prisma } from "@/lib/utils/prisma";
import { useCSRFPrevention as CSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";
import { createSchema, createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs,
    resolvers: {
      Query: {
        getAllNotes: async () => {
          const result = await prisma.notes.findMany();
          return result;
        },
        getNote: async (_, args) => {
          const result = await prisma.notes.findUnique({
            where: {
              id: Number(args.id),
            },
          });
          return result;
        },
      },
      Mutation: {
        addNote: async (_, args) => {
          const { title, body } = args;
          await prisma.notes.create({
            data: {
              title,
              body,
            },
          });

          return {
            statusCode: 200,
            message: "Success create note!",
          };
        },
        editNote: async (_, args) => {
          const { id, title, body } = args;
          await prisma.notes.update({
            data: {
              title,
              body,
            },
            where: {
              id: Number(id),
            },
          });

          return {
            statusCode: 200,
            message: "Success update note!",
          };
        },
        deleteNote: async (_, args) => {
          const { id } = args;
          await prisma.notes.delete({
            where: {
              id: Number(id),
            },
          });

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
