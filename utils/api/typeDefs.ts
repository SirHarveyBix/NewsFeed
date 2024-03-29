import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Feed {
    id: ID
    name: String
    url: String
    author: User
    tags: [FeedTag]
    bundles: [Bundle]
    likes: [User]
    savedArticles: [SavedArticle]
  }
  type Bundle {
    id: ID
    name: String
    description: String
    author: User
    tags: [BundleTag]
    feeds: [Feed]
    likes: [User]
  }
  type User {
    id: ID
    auth0: String
    nickname: String
    picture: String
    bundles: [Bundle]
    feeds: [Feed]
    feedLikes: [Feed]
    bundleLikes: [Bundle]
  }

  type FeedTag {
    id: ID
    name: String
    feeds: [Feed]
  }
  type BundleTag {
    id: ID
    name: String
    bundles: [Bundle]
  }

  input FeedInput {
    id: ID
  }
  input BundleInput {
    id: ID
  }
  input FeedCreateInput {
    id: ID
    url: String
    name: String
    tags: NestedFeedTagCreateInput
  }
  input NestedFeedTagCreateInput {
    create: [FeedTagCreateInput]
    connect: [FeedTagWhereUniqueInput]
  }

  input BundleCreateInput {
    id: ID
    name: String
    description: String
    tags: NestedBundleTagCreateInput
    feeds: NestedBundleFeedCreateInput
  }
  input NestedBundleTagCreateInput {
    create: [BundleTagCreateInput]
    connect: [BundleTagWhereUniqueInput]
  }
  input NestedBundleFeedCreateInput {
    create: [FeedCreateInput]
    connect: [FeedWhereUniqueInput]
  }
  input FeedTagCreateInput {
    id: ID
    name: String
  }
  input FeedWhereUniqueInput {
    id: ID
    url: String
  }
  input FeedTagWhereUniqueInput {
    id: ID
    name: String
  }
  input BundleTagCreateInput {
    id: ID
    name: String
  }
  input BundleTagWhereUniqueInput {
    id: ID
    name: String
  }

  input LikeBundleInput {
    bundleId: ID
    likeState: Boolean
  }
  input LikeFeedInput {
    feedId: ID
    likeState: Boolean
  }

  input FindFeedTagsInput {
    search: String
  }
  input FindBundleTagsInput {
    search: String
  }

  input FindFeedsInput {
    search: String
  }

  input FeedUpdateInput {
    id: ID
    url: String
    name: String
    tags: NestedFeedTagUpdateInput
  }

  input NestedFeedTagUpdateInput {
    create: [FeedTagCreateInput]
    connect: [FeedTagWhereUniqueInput]
    disconnect: [FeedTagWhereUniqueInput]
  }

  input BundleUpdateInput {
    id: ID
    name: String
    description: String
    tags: NestedBundleTagUpdateInput
    feeds: NestedBundleFeedUpdateInput
  }

  input NestedBundleTagUpdateInput {
    create: [BundleTagCreateInput]
    connect: [BundleTagWhereUniqueInput]
    disconnect: [BundleTagWhereUniqueInput]
  }

  input NestedBundleFeedUpdateInput {
    create: [FeedCreateInput]
    connect: [FeedWhereUniqueInput]
    disconnect: [FeedWhereUniqueInput]
  }

  scalar JSON

  type SavedArticle {
    id: ID
    author: User
    url: String
    content: JSON
    feed: Feed
  }

  input SavedArticleInput {
    id: ID # to find by id and url Same for deletion : instead of DeleteSavedArticleInput
    url: String
  }

  input SavedArticleCreateInput {
    feed: NestedFeedCreateInput
    content: JSON
    url: String
  }
  input NestedFeedCreateInput {
    connect: FeedWhereUniqueInput
  }

  type Query {
    hello: String
    feed(data: FeedInput): Feed
    bundle(data: BundleInput): Bundle
    feeds: [Feed]
    bundles: [Bundle]
    findFeedTags(data: FindFeedTagsInput): [FeedTag]
    findBundleTags(data: FindBundleTagsInput): [BundleTag]
    findFeeds(data: FindFeedsInput): [Feed]
    savedArticle(data: SavedArticleInput): SavedArticle
    savedArticles: [SavedArticle]
    me: User
  }
  type Mutation {
    createFeed(data: FeedCreateInput): Feed
    createBundle(data: BundleCreateInput): Bundle
    likeBundle(data: LikeBundleInput): Bundle
    likeFeed(data: LikeFeedInput): Feed
    updateFeed(data: FeedUpdateInput): Feed
    updateBundle(data: BundleUpdateInput): Bundle
    createSavedArticle(data: SavedArticleCreateInput): SavedArticle
    deleteBundle(data: BundleInput): Bundle
    deleteFeed(data: FeedInput): Feed
    deleteSavedArticle(data: SavedArticleInput): SavedArticle
  }
`;
