export const resolvers = {
  Query: {
    hello: (_parent: any, _args: any, _context: any) => 'hi!',
    id: (_parent: any, _args: any, _context: any) =>
      "it is supposed to work fine with 'hello' query",
  },
};
