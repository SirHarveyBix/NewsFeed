import { prisma } from '.prisma/client';
import { verifyOwnership } from './verifyOwnerShip';

const createFieldResolver = (modelName, parName) => ({
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
    ...createFieldResolver('feed', 'author'),
    ...createFieldResolver('feed', 'tags'),
    ...createFieldResolver('feed', 'bundles'),
    ...createFieldResolver('feed', 'likes'),
  },
  Bundle: {
    ...createFieldResolver('bundle', 'author'),
    ...createFieldResolver('bundle', 'tags'),
    ...createFieldResolver('bundle', 'feeds'),
    ...createFieldResolver('bundle', 'likes'),
  },
  BundleTag: {
    ...createFieldResolver('bundleTag', 'bundles'),
  },
  FeedTag: {
    ...createFieldResolver('feedTag', 'feeds'),
  },
  SavedArticle: {
    ...createFieldResolver('savedArticle', 'feed'),
    ...createFieldResolver('savedArticle', 'author'),
  },
  User: {
    ...createFieldResolver('user', 'feeds'),
    ...createFieldResolver('user', 'bundles'),
    ...createFieldResolver('user', 'bundleLikes'),
    ...createFieldResolver('user', 'feedLikes'),
  },
  Query: {
    feed: (_parent, { data: { id } }, { prisma }) =>
      prisma.feed.findUnique({
        where: { id },
      }),
    feeds: (_parent, _args, { prisma }) => prisma.feed.findMany(),
    bundle: (_parent, { data: { id } }, { prisma }) => {
      return prisma.bundle.findUnique({ where: { id } });
    },
    bundles: (_parent, _args, { prisma }) => prisma.bundle.findMany(),
    findFeedTags: (_parent, { data }, { prisma }) =>
      prisma.feedTag.findMany({
        where: { name: { contains: data.search } },
      }),
    findBundleTags: (_parent, { data }, { prisma }) =>
      prisma.bundleTag.findMany({
        where: { name: { contains: data.search } },
      }),
    findFeeds: (_parent, { data }, { prisma }) =>
      prisma.feed.findMany({
        where: { name: { contains: data.search } },
      }),
    savedArticle: async (_parent, { data: { url } }, { prisma, user: { id: authorId } }) => {
      const savedArticles = await prisma.savedArticle.findMany({
        where: { url, authorId },
      });
      return savedArticles[0];
    },
    savedArticles: (_parent, _args, { prisma, user: { id: authorId } }) =>
      prisma.savedArticle.findMany({
        where: { authorId: authorId ? authorId : null },
      }),
    me: (_parent, _args, { prisma, user: { id } }) =>
      prisma.findUnique({
        where: { id },
      }),
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
    updateFeed: async (_parent, { data: { id, ...feedUpdate } }, { prisma, user }) => {
      // verify if user own the feed
      const feed = await prisma.feed.findUnique({ where: { id }, include: { author: true } });
      verifyOwnership(feed, user); // throw the Error(message)
      return prisma.feed.update({ where: { id }, data: { ...feedUpdate } });
    },
    updateBundle: async (_parent, { data: { id, ...bundleUpdate } }, { prisma, user }) => {
      // verify if user own the bundle
      const bundle = await prisma.findUnique({ where: { id }, include: { author: true } });
      verifyOwnership(bundle, user); // throw the Error(message)
      return prisma.bundle.update({ where: { id }, data: { ...bundleUpdate } });
    },
    createSavedArticle: async (_parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      return prisma.savedArticle.create({ data: { ...data, ...author } });
    },
    deleteBundle: async (_parent, { data: { id } }, { prisma, user }) => {
      const bundle = await prisma.bundle.findUnique({ where: { id }, include: { author: true } });
      verifyOwnership(bundle, user);
      await prisma.bundle.delete({ where: { id: bundle.id } });
      return bundle;
    },
    deleteFeed: async (_parent, { data: { id } }, { prisma, user }) => {
      const feed = await prisma.feed.findUnique({ where: { id }, include: { author: true } });
      verifyOwnership(feed, user);
      await prisma.feed.delete({ where: { id: feed.id } });
      return feed;
    },
    deleteSavedArticle: async (_parent, { data: { id } }, { prisma, user }) => {
      const savedArticle = await prisma.savedArticle.findUnique({
        where: { id },
        include: { author: true },
      });
      verifyOwnership(savedArticle, user);
      await prisma.savedArticle.delete({ where: { id: savedArticle.id } });
      return savedArticle;
    },
  },
};
