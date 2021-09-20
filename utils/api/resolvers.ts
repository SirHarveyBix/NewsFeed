import { prisma } from '.prisma/client';
import { connect } from 'http2';
import { disconnect } from 'process';

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
    ...creatFieldResolver('feed', 'tags'),
    ...creatFieldResolver('feed', 'bundles'),
    ...creatFieldResolver('feed', 'likes'),
  },
  Bundle: {
    ...creatFieldResolver('bundle', 'author'),
    ...creatFieldResolver('bundle', 'tags'),
    ...creatFieldResolver('bundle', 'feeds'),
    ...creatFieldResolver('bundle', 'likes'),
  },
  BundleTag: {
    ...creatFieldResolver('bundleTag', 'bundles'),
  },
  FeedTag: {
    ...creatFieldResolver('feedTag', 'feeds'),
  },
  Query: {
    hello: (_parent, _args, _context, _info) => 'hi!',
    feed: (_parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
    feeds: (_parent, _args, { prisma }) => prisma.feed.findMany(),
    bundle: (_parent, { data: { id } }, { prisma }) => {
      return prisma.bundle.findUnique({ where: { id } });
    },
    bundles: (_parent, _args, { prisma }) => prisma.bundle.findMany(),
    findFeedTags: (_parent, { data }, { prisma }) =>
      prisma.feedTag.findMany({ where: { name: { contains: data.search } } }),
    findBundleTags: (_parent, { data }, { prisma }) =>
      prisma.bundleTag.findMany({ where: { name: { contains: data.search } } }),
    findFeeds: (_parent, { data }, { prisma }) =>
      prisma.feed.findMany({ where: { name: { contains: data.search } } }),
  },
  Mutation: {
    createFeed: async (_parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.feed.create({ data: { ...data, ...author } });
      return result;
    },
    createBundle: async (_parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.bundle.create({ data: { ...data, ...author } });
      return result;
    },
    likeBundle: (_parent, { data }, { prisma, user }, _info) => {
      const { bundleId, likeState } = data;
      const connectState = likeState ? 'connect' : 'disconnect';
      return prisma.bundle.update({
        where: { id: bundleId },
        data: { likes: { [connectState]: { id: user.id } } },
      });
    },
    likeFeed: (_parent, { data }, { prisma, user }, _info) => {
      const { feedId, likeState } = data;
      const connectState = likeState ? 'connect' : 'disconnect';
      return prisma.feed.update({
        where: { id: feedId },
        data: { like: { [connectState]: { id: user.id } } },
      });
    },
  },
};
