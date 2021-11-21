import { createStore } from 'vuex'

export default createStore({
  state: {
    cars: [],
    isAuthentif: false
  },
  getters: {
    cars: state => {
      return state.cars
    }
  },
  mutations: {
    SET_AUTH: (state, status) => {
      state.isAuthentif = status
    },
    SET_CARS: (state, cars) => {
      state.cars = cars
    },
    ADD_CAR: (state, car) => {
      state.cars.push(car)
    },
    DELETE_CAR: (state, id) => {
      var index = state.cars.findIndex(car => car.id == id)
      state.cars.splice(index, 1);
    },
    EDIT_CAR: (state, car) => {
      Object.assign(state.cars[state.cars.findIndex(c => c.id === car.id)], car);
    }
  },
  actions: {
    login: ({ commit }, payload) => {
      commit('SET_AUTH', payload)
    },
    fetchCars: ({ commit }, payload) => {
      commit('SET_CARS', payload)
    },
    addCar: ({ commit }, payload) => {
      commit('ADD_CAR', payload)
    },
    deleteCar: ({ commit }, payload) => {
      commit('DELETE_CAR', payload)
    },
    editCar: ({ commit }, payload) => {
      commit('EDIT_CAR', payload)
    }
  },
  modules: {
  }
})