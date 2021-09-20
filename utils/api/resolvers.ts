const creatFieldResolver = (modelName, parName) => ({
  [parName]: async ({ id }, args, { prisma }) => {
    const modelResponse = await prisma[modelName].findUnique({
      where: { id },
      include: { [parName]: true },
    });
    return modelResponse[parName];
  },
});

export const resolvers = {
  Feed: {
    // author: ({ authorId }, args, { prisma }) => {
    //   prisma.user.fundUnique({ where: { id: authorId } });
    // },
    ...creatFieldResolver('feed', 'author'),
  },
  Bundle: {
    ...creatFieldResolver('bundle', 'author'),
  },
  Query: {
    hello: (_parent, _args, _context, _info) => 'hi!',
    feed: (_parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
    feeds: (_parent, _args, { prisma }) => prisma.feed.findMany(),
    bundle: (_parent, { data: { id } }, { prisma }) => {
      return prisma.bundle.findUnique({ where: { id } });
    },
    bundles: (_parent, _args, { prisma }) => prisma.bundle.findMany(),
  },
  Mutation: {
    createFeed: async (_parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.feed.create({ data: { ...data, ...author } });
      return result;
    },
    createBundle: async (_parent, { data }, { prisma, user }) => {
      const author = { author: { conect: { id: user.id } } };
      const result = await prisma.bundle.create({ data: { ...data, ...author } });
      return result;
    },
  },
};
