import axios from "axios";

const quizModule = {
  namespaced: true,
  state() {
    return {
      quizzes: [],
      quiz: {
        questions: [],
        title: "Test Quiz",
        author: {id: 2, firstName: "Test", lastName: "Test"},
        updatedAt: "01.02.2021",
        description: "Testing testing.",
        category: "Test",
        scores: [
          {date: '01.02.2021', score: 10, total: 10},
          {date: '01.02.2021', score: 5, total: 10},
          {date: '01.02.2021', score: 8, total: 10},
        ]
      },
      searchedQuizzes: []
    }
  },
  mutations: {
    setQuizzes(state, payload) {
      state.quizzes = payload;
    },
    setQuiz(state, payload) {
      state.quiz = payload;
    },
    setSearchedQuizzes(state, payload) {
      state.searchedQuizzes = payload;
    }
  },
  actions: {
    async fetchQuizzes({ commit }, payload) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:8080/quizzes/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuizzes", response.data);        
      } catch (error) {
        console.error('Failed to get quizzes:', error);        
      }
    },
    async fetchQuizById({ commit, state }, payload) {
      try {        
        const quizId = payload;
        if (!quizId) {
          throw new Error("No quiz ID provided");
        }
        console.log(payload)
        if (state.quizzes.some(quiz => quiz.id === payload)) {
          commit("setQuiz", state.quizzes.find(quiz => quiz.id === payload));
          return;
        }
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuiz", response.data);   
        return response.data;     
      } catch (error) {
        console.error('Failed to get user info:', error);        
      }
    },
    async createQuiz({ commit }, payload) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:8080/quizzes`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuiz", response.data);
      } catch (error) {
        console.error('Failed to get user info:', error);   
      }
    },
    async searchForQuiz({ commit }, payload) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/quizzes/search?query=${payload}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setSearchedQuizzes", response.data);
      } catch (error) {
        console.error('Failed to get user info:', error);   
      }
    }
  },
}

export default quizModule;