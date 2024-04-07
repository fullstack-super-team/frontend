import { Category } from "@/utils/category";
import { DifficultyLevel } from "@/utils/difficultyLevel";
import axios from "axios";
import router from "@/router";

/**
 * Quiz module for Vuex store
 */

/**
 * Define the quiz module for the Vuex store.
 */
const quizModule = {
  namespaced: true,
  // Holds all the reactive data for the quiz module.
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
    // Set the quizzes array.
    setQuizzes(state, payload) {
      state.quizzes = payload;
    },
    // Set the quiz along with its details.
    setQuiz(state, payload) {
      const quiz = payload;
      quiz.difficultyLevel = DifficultyLevel[quiz.difficultyLevel];
      quiz.category = Category[quiz.category];
      quiz.totalPoints = quiz.questions.reduce((acc, question) => acc + question.points, 0);
      state.quiz = quiz;
    },
    // Set the searched quizzes array.
    setSearchedQuizzes(state, payload) {
      state.searchedQuizzes = payload;
    },
    // Set the personal scores for the quiz.
    setPersonalScores(state, payload) {
      state.quiz.personalScores = payload;
    },
    // Set the recent quizzes array.
    setRecentQuizzes(state, payload) {
      state.recentQuizzes = payload;
    }
  },
  actions: {
    // Fetch all quizzes associated with the user.
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
    // Fetch the most recent quizzes.
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
    // Fetch a quiz by its ID, along with the personal scores.
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
    // Fetch the personal scores for the quiz for the current user.
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
    // Create a new quiz, and submit it to the backend.
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
    // Update an existing quiz.
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
    // Delete a quiz by its ID, and redirect to the home page.
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
        router.push("/");
      } catch (error) {
        console.error('Failed to delete quiz:', error);   
      }
    },
    // Search for quizzes by a query.
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

/**
 * Exports the quiz module.
 */
export default quizModule;