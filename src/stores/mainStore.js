import { createStore } from "vuex";
import userModule from "./userModule";
import gameModule from "./gameModule";
import quizModule from "./quizModule";

const store = createStore({
  modules: {
    user: userModule,
    game: gameModule,
    quiz: quizModule
  }
});

export default store;
