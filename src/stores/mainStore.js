import { createStore } from "vuex";
import userModule from "./userModule";

const store = createStore({
  modules: {
    user: userModule,
  }
});

export default store;
