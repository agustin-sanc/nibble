# Nibble

## Tech stack
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [PostgreSQL](https://postgresql.org)
- [Clerk](https://clerk.com/)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn](https://ui.shadcn.com/)

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
- Run `pnpm db:seed` to seed database 
- Run `pnpm run dev` to start app

## Additional notes

- If you change the database schema, run the command `pnpm db:push` to update the database.

- If you want to reset the database, run the command `pnpm db:reset`.