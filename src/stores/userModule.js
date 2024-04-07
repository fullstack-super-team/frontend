import axios from 'axios';

/**
 * User module for Vuex store
 */

/**
 * Define the user module for the Vuex store.
 */
const userModule = {
  namespaced: true,
  // Holds all the reactive data for the user module.
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
    // Set the user info.
    setUserInfo(state, payload) {
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.username = payload.username;
      state.email = payload.email;
      state.token = payload.token;
      state.isLoggedIn = payload.isLoggedIn;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setIsLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    }
  },
  actions: {
    // Fetch the user info from the server.
    async getUserInfo({ commit, dispatch }, payload) {
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
        dispatch("logout");
      }
    },
    // Login the user and store the token in local storage.
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
    // Register a new user, log in and store the token in local storage.
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
    // Update the user's information.
    async updateUser({ commit }, payload) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put("http://localhost:8080/users/me", payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        commit("setUserInfo", { ...response.data, token: token, isLoggedIn: true });
        return {
          text: "User updated successfully!"
        }
      } catch (error) {
        console.error('Failed to update user:', error);
        commit("setError", error);
        return {          
          text: error?.response?.data?.message || error.message || "Something went wrong",
          error: true
        };
      }
    },
    // Logout the user and remove the token from local storage.
    async logout({ commit }) {
      localStorage.removeItem("token");
      console.log("Logged out")
      commit("setUserInfo", { name: "", email: "", token: "", isLoggedIn: false });
    }
  },
}

/**
 * Exports the user module.
 */
export default userModule;