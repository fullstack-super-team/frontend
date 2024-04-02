import axios from 'axios';

const userModule = {
  namespaced: true,
  state() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      token: "",
      isLoggedIn: false
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.username = payload.username;
      state.email = payload.email;
      state.token = payload.token;
      state.isLoggedIn = payload.isLoggedIn;
    }
  },
  actions: {
    async getUserInfo({ commit }, payload) {
      try {
        const response = await axios.get('http://localhost:8080/users/me', {
          headers: {
            Authorization: `Bearer ${payload}`
          }
        });
        commit("setUserInfo", { ...response.data, token: payload, isLoggedIn: true });        
      } catch (error) {
        console.error('Failed to get user info:', error);        
      }
    },
    async login({ commit }, payload) {
      const token = payload;
      localStorage.setItem("token", token);
      await this.dispatch("user/getUserInfo", token);
    },
    async logout({ commit }) {
      localStorage.removeItem("token");
      console.log("Logged out")
      commit("setUserInfo", { name: "", email: "", token: "", isLoggedIn: false });
    }
  },
}

export default userModule;