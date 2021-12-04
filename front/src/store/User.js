export const UserModule = {
  namespaced: true,

  state: {
    user: null,
    seller: null,
    users: [],
  },

  // Mutations are functions that effect the STATE.
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_SELLER(state, seller) {
      state.seller = seller;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    DELETE_USER: (state, id) => {
      var index = state.users.findIndex((user) => user.id == id);
      state.users.splice(index, 1);
    },
    REFRESH: (state, user) => {
      var index = state.users.findIndex((userLocal) => user.id == userLocal.id);
      state.users.splice(index, 1, user);
    },
  },

  // Actions are functions that you call throughout your application that call mutations.
  actions: {
    setUser: ({ commit }, payload) => {
      commit("SET_USER", payload);
    },
    setSeller: ({ commit }, payload) => {
      commit("SET_SELLER", payload);
    },
    fetchUsers: ({ commit }, payload) => {
      commit("SET_USERS", payload);
    },
    deleteUser: ({ commit }, payload) => {
      commit("DELETE_USER", payload);
    },
    refresh: ({ commit }, payload) => {
      commit("REFRESH", payload);
    },
  },
};
