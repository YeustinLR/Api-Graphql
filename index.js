const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const typeDefs = require('./schema/typeDefs');
const restrictedUserResolvers = require('./resolvers/restrictedUserResolvers');
const playlistResolvers = require('./resolvers/playlistResolvers');


const mergedTypeDefs = mergeTypeDefs([typeDefs]);
const mergedResolvers = mergeResolvers([restrictedUserResolvers,playlistResolvers]);

module.exports = { typeDefs: mergedTypeDefs, resolvers: mergedResolvers };
