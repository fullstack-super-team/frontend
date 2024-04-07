import { Category } from "@/utils/category";
import { DifficultyLevel } from "@/utils/difficultyLevel";
import axios from "axios";

const quizModule = {
  namespaced: true,
  state() {
    return {
      quizzes: [],
      recentQuizzes: [],
      quiz: {
        questions: [],
        title: "Test Quiz",
        author: {id: 2, firstName: "Test", lastName: "Test"},
        updatedAt: "01.02.2021",
        description: "Testing testing.",
        category: "Test",
        personalScores: [],
        totalPoints: 0,
      },
      searchedQuizzes: []
    }
  },
  mutations: {
    setQuizzes(state, payload) {
      state.quizzes = payload;
    },
    setQuiz(state, payload) {
      const quiz = payload;
      quiz.difficultyLevel = DifficultyLevel[quiz.difficultyLevel];
      quiz.category = Category[quiz.category];
      quiz.totalPoints = quiz.questions.reduce((acc, question) => acc + question.points, 0);
      state.quiz = quiz;
    },

    setSearchedQuizzes(state, payload) {
      state.searchedQuizzes = payload;
    },
    setPersonalScores(state, payload) {
      state.quiz.personalScores = payload;
    },
    setRecentQuizzes(state, payload) {
      state.recentQuizzes = payload;
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
    async fetchRecentQuizzes({ commit }, payload) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:8080/quizzes/recent`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setRecentQuizzes", response.data);
      } catch (error) {
        console.error('Failed to get quizzes:', error);
      }
    },
    async fetchQuizById({ commit, state, dispatch }, payload) {
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
        await dispatch("fetchPersonalScores", quizId);
        return response.data;     
      } catch (error) {
        console.error('Failed to fetch quiz by id:', error);        
      }
    },
    async fetchPersonalScores({ commit }, payload) {
      try {
        const quizId = payload;
        if (!quizId) {
          throw new Error("No quiz ID provided");
        }
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/quizzes/${quizId}/scores/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setPersonalScores", response.data);
        } catch (error) {
        console.error('Failed to fetch personal scores:', error);
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
    async updateQuiz({ commit }, payload) {
      try {
        const quizId = payload.id;
        if (!quizId) {
          throw new Error("No quiz ID provided");
        }
        const quiz = payload.quiz;
        const token = localStorage.getItem("token");
        const response = await axios.put(`http://localhost:8080/quizzes/${quizId}`, quiz, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuiz", response.data);
      } catch (error) {
        console.error('Failed to update quiz:', error);   
      }
    },
    async deleteQuiz({ commit }, payload) {
      try {
        const quizId = payload;
        if (!quizId) {
          throw new Error("No quiz ID provided");
        }
        const token = localStorage.getItem("token");
        const response = await axios.delete(`http://localhost:8080/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
      } catch (error) {
        console.error('Failed to delete quiz:', error);   
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