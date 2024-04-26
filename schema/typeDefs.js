const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type RestrictedUser {
    id: ID!
    nombreCompleto: String
    pin: String
    avatar: String
    edad: Int
    usuarioPrincipal: ID
  }
  type Video {
    _id: ID!
    nombreVideo: String
    urlYoutube: String
    descripcion: String
    playlistAsociada: ID
  }
  
  type Playlist {
    _id: ID!
    nombrePlaylist: String
    perfilesAsociados: [ID]
    usuarioPrincipal: ID
    videos: [Video]
  }
  type Query {
    restrictedUsers: [RestrictedUser]
    restrictedUserById(id: ID!): RestrictedUser
    playlistById(id: ID!): Playlist
    playlistsAndVideos: [Playlist]
  }
`;

module.exports = typeDefs;
