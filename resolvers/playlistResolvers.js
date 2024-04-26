const axios = require('axios');

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const playlistResolver = {
    Query: {
      playlistById: async (_, { id }, { authToken }) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/yt/playlist/video/${id}`, getHeaders(authToken));
          console.log("AQUI ESTA", id);
          const courses = response.data;
          if (!Array.isArray(courses) || courses.some(course => !course._id)) {
            throw new Error('Error al obtener los cursos: los IDs son inválidos');
          }  
        return courses.map(course => ({
                _id: course._id,
                nombrePlaylist: course.nombrePlaylist,
                perfilesAsociados: course.perfilesAsociados,
                usuarioPrincipal: course.usuarioPrincipal,
                videos:{
                  _id: course.videos._id,
                  nombreVideo: course.videos.nombreVideo,
                  urlYoutube: course.videos.urlYoutube,
                  descripcion: course.videos.descripcion,
                  playlistAsociada: course.videos.playlistAsociada,
                }
            }));

        } catch (error) {
          console.error(error);
          throw new Error('Error al obtener la playlist por ID');
        }
      },
    playlistsAndVideos: async (_, __, { authToken }) => {
      try {
        const response = await axios.get('http://localhost:5000/api/yt/playlist/read', getHeaders(authToken));
        const playlistsData = response.data;

        return playlistsData.map(playlist => ({
          _id: playlist._id,
          nombrePlaylist: playlist.nombrePlaylist,
          perfilesAsociados: playlist.perfilesAsociados,
          usuarioPrincipal: playlist.usuarioPrincipal,
          videos: playlist.videos.map(video => ({
            _id: video._id,
            nombreVideo: video.nombreVideo,
            urlYoutube: video.urlYoutube,
            descripcion: video.descripcion,
            playlistAsociada: video.playlistAsociada,
          }))
        }));
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las playlists y videos');
      }
    }
  }
};

module.exports = playlistResolver;
