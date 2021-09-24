# NewsFeed

[Postgres](https://postgresapp.com/)

- npm run prisma:generate

Primsa made a cool tool : [Prisma Studio](https://www.prisma.io/studio) .


If you want to use apollo studio instead of graphql Playground, remove plugins line in : /pages/api/graphql.ts

meanwhile .. this works fine : [Apollo Studio](https://studio.apollographql.com/sandbox/explorer)

you need to create an Auth0 account, follow what you see on .env, then you must add " http://localhost:3000/api/auth/callback " in Allowed Callback URLs
