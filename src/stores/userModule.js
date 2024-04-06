import axios from 'axios';

const userModule = {
  namespaced: true,
  state() {
    return {
      id: "",
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
      state.id = payload.id;
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
        commit("setError", error);
      }
    },
    async login({ commit }, payload) {
      try {
        const response = await axios.post("http://localhost:8080/auth/login", payload);
        const { token } = response.data;        
        localStorage.setItem("token", token);
        await this.dispatch("user/getUserInfo", token);
      } catch (error) {
        console.error('Failed to login:', error);
        commit("setError", error?.response?.data?.message || error.message || "Something went wrong");
        return error?.response?.data?.message || error.message || "Something went wrong";
      }
    },
    async register({ commit }, payload) {
      try {
        const response = await axios.post("http://localhost:8080/auth/register", payload);
        const { token } = response.data;
        localStorage.setItem("token", token);
        await this.dispatch("user/getUserInfo", token);        
      } catch (error) {
        console.error('Failed to register:', error);
        return error?.response?.data?.message || error.message || "Something went wrong";
      }
    },
    async logout({ commit }) {
      localStorage.removeItem("token");
      console.log("Logged out")
      commit("setUserInfo", { name: "", email: "", token: "", isLoggedIn: false });
    }
  },
}

export default userModule;