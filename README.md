# Nibble

## Tech stack
- [T3 Stack](https://create.t3.gg/)
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [PostgreSQL](https://postgresql.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Clerk](https://clerk.com/)
- [Jest](https://jestjs.io)

## How to run

### 1. Setup database
Run the following command to create the PostgreSQL database: `docker run --name nibble -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=nibble -d -p 5432:5432 postgres`

### 2. Setup code project
- Clone this repo into your local machine
- Go to the root folder in your terminal
- Generate the `.env` file running the following command `cp .env.example .env`
- Add valid environment variables to `.env` (ask Agustín for Clerk environment variables or generate your own Clerk project)
- Run `pnpm install` to install dependencies
- Run `pnpm db:push` to push database schema
- Run `pnpm run dev` to start app
- Run `pnpm run test` to run automated tests

## Another notes

If you change the database schema, run the command `pnpm db:push` to update the database 