import axios from "axios";

const gameModule = {
  namespaced: true,
  state() {
    return {
      quiz: {
        questions: [],
        currentQuestionNumber: 0,
      },
      answers: [],
      currentQuestion: {
        text: "",
        type: "",
        answers: [],
      },
    }
  },
  mutations: {
    setQuiz(state, payload) {
      state.quiz = payload;
    },
    setQuestions(state, payload) {
      state.quiz.questions = payload;
      state.currentQuestion = payload[0];
    },   
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    setCurrentQuestionNumber(state, payload) {
      state.quiz.currentQuestionNumber = payload;
    },
    addAnswer(state, payload) {
      state.answers.push(payload);
    }
  },
  actions: {
    async loadQuizById({ commit }, payload) {
      const token = localStorage.getItem("token");
      try {
        const quizId = payload;
        if (!quizId) {
          throw new Error("No quiz ID provided");
        }
        const response = await axios.get(`http://localhost:8080/quizzes/${quizId}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
        commit("setQuestions", response.data);
        commit("setCurrentQuestionNumber", 0)
      } catch (error) {
        console.error('Failed to get user info:', error);        
      }
    },
    async startQuiz({ commit }) {
      commit("setCurrentQuestion", 1);
    },
    async nextQuestion({ commit, state }) {
      commit("setCurrentQuestionNumber", state.quiz.currentQuestionNumber + 1);
      commit("setCurrentQuestion", state.quiz.questions[state.quiz.currentQuestionNumber]);
    },
    async submitAnswer({ commit }, payload) {      
      try {
        const answer = payload;
        if (!answer) {
          throw new Error("No answer provided");
        }
        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:8080/quizzes/${state.quiz.id}/answer`, {
          answer,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        commit("addAnswer", response.data);
      } catch (error) {
        console.error('Failed to submit answer:', error);        
      }
    }
  },
}

export default gameModule;