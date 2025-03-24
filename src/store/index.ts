import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    login({ commit }, token: string) {
      commit("setToken", token);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
});
