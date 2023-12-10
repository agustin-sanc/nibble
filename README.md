# Nibble

Nibble is a platform for programming courses that allows students to learn by doing, help teachers to automate the evaluation process and provide a better learning experience for students because they don't have to wait for the teacher to evaluate their work. Nibble also generates reports so teachers can have a better understanding of their students' progress and necessities.

## System architecture

Nibble is divided in two subsystems: the evaluator and the web platform that students and teachers use.

- The evaluator is a Python server application that evaluates the students' code.

- The web platform is a Next.js application that runs in a server and allows students and teachers to interact with the system.

This is the repository for the web platform.

## Web platform tech stack
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [PostgreSQL](https://postgresql.org)
- [Clerk](https://clerk.com/)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn](https://ui.shadcn.com/)

## How to run the project

### 1. Setup database
Run the following command to create the PostgreSQL database:

```
docker run --name nibble -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=nibble -d -p 5432:5432 postgres
```

### 2. Setup code project
- Clone this repo into your local machine
- Go to the root folder in your terminal
- Generate the `.env` file running the following command `cp .env.example .env`
- Add valid environment variables to `.env` (ask Agustín for Clerk environment variables or generate your own Clerk project)
- Run `pnpm install` to install dependencies
- Run `pnpm db:push` to push database schema
- Run `pnpm db:seed` to seed database 
- Run `pnpm dev` to start app

## Additional notes

- If you change the database schema, run the command `pnpm db:push` to update the database. Modify the seed file if necessary. Since we're not deploying this web platform anywhere and just running it locally, we aren't managing database migrations and directly push the schema instead.

- If you want to reset the database, run the command `pnpm db:reset`, and then run `pnpm db:push`. Optionally, you can run `pnpm db:seed` to generate data.

- In order to assign professor permissions to a user, you have to search the user in Clerk dashboard, and add the following property to the user public metadata: `isProfessor: true`.