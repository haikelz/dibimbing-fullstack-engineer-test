<div align="center">
  <h1>Noted</h1>
  <p>Transform Your Ideas Into Action – Your Ultimate Note-Taking Solution</p>
</div>

## Tech Stack

- Next JS
- Typescript
- Chakra UI
- Framer Motion
- React Query
- Vercel Postgres
- GraphQL (using GraphQL Yoga)

## Screenshots

|                                                                     |                                                                      |
| :-----------------------------------------------------------------: | :------------------------------------------------------------------: |
| ![ss 1](/public/docs/Screenshot%20from%202024-08-12%2011-37-21.png) | ![ss 2](/public/docs/Screenshot%20from%202024-08-12%2011-40-07.png)  |
| ![ss 3](/public/docs/Screenshot%20from%202024-08-12%2011-40-14.png) | ![ss 4](/public/docs/Screenshot%20from%202024-08-12%2011-40-22.png)  |
| ![ss 5](/public/docs/Screenshot%20from%202024-08-12%2011-41-56.png) | ![ss 6](/public/docs/Screenshot%20from%202024-08-12%2011-42-03.png)  |
| ![ss 7](/public/docs/Screenshot%20from%202024-08-12%2011-47-08.png) | ![ss 8](/public/docs/Screenshot%20from%202024-08-12%2011-47-23.png)  |
| ![ss 9](/public/docs/Screenshot%20from%202024-08-12%2011-54-10.png) | ![ss 10](/public/docs/Screenshot%20from%202024-08-12%2014-54-02.png) |
|                                                                     |                                                                      |

## Link

- [Repo](https://github.com/haikelz/dibimbing-fullstack-engineer-test)
- [Live Website](https://dibimbing-fullstack-engineer-test.vercel.app/)

## Getting Started

**A. Prerequisites**

- Node.js (Latest Version).
- Pnpm.
- Vercel CLI.
- Docker (optional).

**B. Process**

- Clone this repo.
- Install all dependencies `with pnpm install`.
- Create a database in [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (for the name, It's up to you), and create a table called `notes` with the following columns:

  ![Columns](/public/docs/Screenshot%20from%202024-08-12%2015-09-16.png)

- Make sure that you already installed Vercel CLI globally. Run `vercel env pull .env` to integrate and update your `env` with given env from Vercel.
- After that, run this project with command `pnpm run dev` and see the result in http://localhost:3000. You can also run this project using Docker. Start your Docker first and type `docker compose up --build` in your terminal.
