import { createStore } from "vuex";
import userModule from "./userModule";
import gameModule from "./gameModule";
import quizModule from "./quizModule";

/**
 * Main Vuex store.
 */

/**
 * Create a new Vuex store.
 *
 * @type {Store<unknown>}
 */
const store = createStore({
  modules: {
    user: userModule,
    game: gameModule,
    quiz: quizModule
  }
});

/**
 * Exports the store.
 */
export default store;
