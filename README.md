# NewsFeed

[Postgres](https://postgresapp.com/)

- npm run prisma:generate

Primsa made a cool tool : [Prisma Studio](https://www.prisma.io/studio) .


If you want to use apollo studio instead of graphql Playground, remove plugins line in : /pages/api/graphql.ts

meanwhile .. this works fine : [Apollo Studio](https://studio.apollographql.com/sandbox/explorer)


[Auth0](https://manage.auth0.com/)

you need to create an Auth0 account, follow what you see on .env, then you must add " http://localhost:3000/api/auth/callback " in Allowed Callback URLs



## Udemy course review - [End to End React with Prisma 2](https://www.udemy.com/course/end-to-end-react-with-prisma-2) :
Unfortunately due to the updgrade of Auth0 > 1.4, the instructor make thing higly complicated, i've been helped with his [github](https://github.com/CaptainChemist/newsprism), but still, its really messy, and almost a copy past course, because no explanation, or a tiny bit.

I wanted to learn prisma, he uses next js, why not, and auth0, great, but the course isn't upgrated at all, so you have to manage yourself, for everything, (out of prisma), wich takes useless time.

So if you mind to take this course, to practice prisma 2.0, the first part (Back-end) is good enough, if you never used, next js, type everything as he types, dont use your imagination, if you never used auth0, or mudules like this, start from the [last commit ..](https://github.com/CaptainChemist/newsprism/commit/c0765b7ac71c2c139b7b6fa9cea5bca642168ae3)
