# Nibble

## Tech stack
- [T3 Stack](https://create.t3.gg/)
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Clerk](https://clerk.com/)
- [Jest](https://jestjs.io)

## How to run

- `cp .env.example .env`
- Add valid environment variables to `.env` (ask Agustín for Clerk environment variables)
- `pnpm install`
- `pnpm db:push`
- `pnpm run dev` to start app
- `pnpm run test` to run tests

## Another notes

- If you change the database schema, run the command `pnpm db:push` to update the database from root folder