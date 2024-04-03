import axios from "axios";

const gameModule = {
  namespaced: true,
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
    async submitAnswer({ commit, state }, payload) {
      try {
        const answer = payload;
        console.log(answer)
        if (!answer) {
          throw new Error("No answer provided");
        }
        const token = localStorage.getItem("token");
        console.log(state.quiz)
        const response = await axios.post(`http://localhost:8080/quizzes/${state.quiz.id}/questions/${state.currentQuestion.id}/submit-answer`, {
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