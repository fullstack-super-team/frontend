import { createStore } from "vuex";
import userModule from "./userModule";
import gameModule from "./gameModule";

const store = createStore({
  modules: {
    user: userModule,
    game: gameModule,
  }
});

export default store;
