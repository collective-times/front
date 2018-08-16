import axios from 'axios';

export const state = () => ({
  accessToken: null,
  refreshToken: null,
})

export const mutations = {
  SET_USER: function(state, data) {
    state.accessToken = data.access_token;
    state.refreshToken = data.refresh_token;
  }
}

export const actions = {
  async login({commit}, {username, password}) {
    try {
      const {data} = await this.$axios.post('/oauth/token', {
        grant_type: 'password',
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret,
        username,
        password
      })
      console.log(data);
      commit('SET_USER', data);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        throw new Error('Bad credentials');
      }
      throw error;
    }
  },
  async logout({commit}) {
    commit('SET_USER', null);
  }
};