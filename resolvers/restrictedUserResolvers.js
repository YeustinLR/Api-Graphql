const axios = require('axios');

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const restrictedUserResolvers = {
  Query: {
    restrictedUsers: async (_, __, { authToken }) => {
      try {
        const response = await axios.get('http://localhost:5000/api/yt/restrictedUser/read', getHeaders(authToken));
        const restrictedUsers = response.data;
        if (!Array.isArray(restrictedUsers) || restrictedUsers.some(user => !user._id)) {
          throw new Error('Error al obtener los restricted users: los IDs son inválidos');
        }

        return restrictedUsers.map(user => ({
          id: user._id,
          nombreCompleto: user.nombreCompleto,
          pin: user.pin,
          avatar: user.avatar,
          edad: user.edad,
          usuarioPrincipal: user.usuarioPrincipal,
        }));
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los restricted users');
      }
    },
    restrictedUserById: async (_, { id }, { authToken }) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/yt/restrictedUser/read/?id=${id}`, getHeaders(authToken));
        const user = response.data;

        if (!user || !user._id) {
          throw new Error('No se encontró ningún restricted user con el ID proporcionado');
        }

        return {
          id: user._id,
          nombreCompleto: user.nombreCompleto,
          pin: user.pin,
          avatar: user.avatar,
          edad: user.edad,
          usuarioPrincipal: user.usuarioPrincipal,
        };
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el restricted user por ID');
      }
    },
  },
};

module.exports = restrictedUserResolvers;
