import axios from "axios";

/**
 * Game module for Vuex store
 */

/**
 * Define the game module for the Vuex store.
 */
const gameModule = {
  namespaced: true,
  // State contains all the reactive data for the game module.
  state() {
    return {
      quiz: {
        id: 1,
        questions: [],
        currentQuestionNumber: 0,
      },
      answers: [],
      currentQuestion: {
        id: 1,
        text: "",
        type: "",
        answers: [],
      },
      highScoreList: [],
      currentPoints: 0,
      totalPoints: 0,
    }
  },
  mutations: {
    // Set the current quiz along with its details.
    setQuiz(state, payload) {
      state.quiz = payload;
    },
    // Set the current question.
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    // Set the current question number.
    setCurrentQuestionNumber(state, payload) {
      state.quiz.currentQuestionNumber = payload;
    },
    // Add a submitted answer to the list of answers.
    addAnswer(state, payload) {
      state.answers.push(payload);
    },
    // Set the answers array, typically to reset it.
    setAnswers(state, payload) {
      state.answers = payload;
    },
    // Update the high score list.
    setHighScoreList(state, payload) {
      state.highScoreList = payload;
    },
    // Set the current points.
    setCurrentPoints(state, payload) {
      state.currentPoints = payload;
    },
    // Add points to the current points.
    addPoints(state, payload) {
      state.currentPoints += payload;
    },
    // Set the quiz's total points.
    setTotalPoints(state, payload) {
      state.totalPoints = payload;
    }
  },
  actions: {
    // Load a quiz by its ID from backend and initialize the state.
    async loadQuizById({ commit }, payload) {
      const token = localStorage.getItem("token");
      try {
        const quizId = payload;
        if (!quizId) {
          throw new Error("No quiz ID provided");
        }
        const response = await axios.get(`${import.meta.env.VITE_REST_API_URL}/quizzes/${quizId}/play`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuiz", response.data);
        commit("setCurrentQuestion", response.data.questions[0]);
        commit("setCurrentQuestionNumber", 0);
        commit("setHighScoreList", []);
        commit("setAnswers", []);
        commit("setCurrentPoints", 0);
        commit("setTotalPoints", 0);
      } catch (error) {
        console.error('Failed to get user info:', error);        
      }
    },
    // Load the next question in the quiz.
    async nextQuestion({ commit, state }) {
      commit("setCurrentQuestionNumber", state.quiz.currentQuestionNumber + 1);
      commit("setCurrentQuestion", state.quiz.questions[state.quiz.currentQuestionNumber]);
    },
    // Submit an answer to the current question.
    async submitAnswer({ commit, state }, payload) {
      try {
        const answer = payload;
        console.log(answer)
        if (!answer) {
          throw new Error("No answer provided");
        }
        const token = localStorage.getItem("token");
        console.log(state.quiz)
        const response = await axios.post(`${import.meta.env.VITE_REST_API_URL}/quizzes/${state.quiz.id}/questions/${state.currentQuestion.id}/submit-answer`, {
          answer,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        commit("addAnswer", response.data);
        commit("addPoints", response.data.pointsGiven);
      } catch (error) {
        console.error('Failed to submit answer:', error);        
      }
    },
    // Finish the quiz and submit the score.
    async finishQuiz({ commit, state }) {
      try {
        console.log(state)
        const points = state.currentPoints;
        if (points === null || points === undefined) {
          throw new Error("No score provided");
        }
        const token = localStorage.getItem("token");
        const submitScoreResponse = await axios.post(`${import.meta.env.VITE_REST_API_URL}/quizzes/${state.quiz.id}/scores`, {
          points
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (submitScoreResponse.status !== 201) {
          throw new Error("Failed to submit score");
        }
        const scoresResponse = await axios.get(`${import.meta.env.VITE_REST_API_URL}/quizzes/${state.quiz.id}/scores`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        commit("setHighScoreList", scoresResponse.data);
        commit("setTotalPoints", state.quiz.questions.reduce((acc, question) => acc + question.points, 0));
      } catch (error) {
        console.error('Failed to finish quiz:', error);        
      }
    }
  },
}

/**
 * Exports the game module.
 */
export default gameModule;