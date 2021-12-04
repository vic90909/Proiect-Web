import { createStore } from "vuex";
import { UserModule } from "./User.js";
import { CarModule } from "./Car.js";
export default createStore({
  state: {
    isAuthentif: false,
    isEditable: true,
    pageIndex: 1,
    noOfPages: 0,
    pages: [],
  },
  getters: {
    isEditable: (state) => {
      return state.isEditable;
    },
  },
  mutations: {
    SET_AUTH: (state, status) => {
      state.isAuthentif = status;
    },
    SET_EDITABLE: (state, isEditable) => {
      state.isEditable = isEditable;
    },
    SET_PAGE: (state, pageIndex) => {
      state.pageIndex = pageIndex;
    },
    SET_NO_OF_PAGES: (state, noOfPages) => {
      state.noOfPages = noOfPages;
      if (state.pages.length == 0) {
        for (let i = 1; i <= noOfPages; i++) {
          state.pages.push(i);
        }
      }
    },
  },
  actions: {
    login: ({ commit }, payload) => {
      commit("SET_AUTH", payload);
    },
    setEditable: ({ commit }, payload) => {
      commit("SET_EDITABLE", payload);
    },
    setPageIndex: ({ commit }, payload) => {
      commit("SET_PAGE", payload);
    },
    setNoOfPages: ({ commit }, payload) => {
      commit("SET_NO_OF_PAGES", payload);
    },
  },

  modules: {
    User: UserModule,
    Car: CarModule,
  },
});
