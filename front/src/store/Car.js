export const CarModule = {
  namespaced: true,

  state: {
    cars: [],
    car: null,
    editCar: null,
  },

  getters: {
    cars: (state) => {
      return state.cars;
    },
    car: (state) => {
      return state.car;
    },
    editCar: (state) => {
      return state.editCar;
    },
  },

  // Mutations are functions that effect the STATE.
  mutations: {
    SET_CARS: (state, cars) => {
      state.cars = cars;
    },
    SET_CAR: (state, car) => {
      state.car = car;
    },
    ADD_CAR: (state, car) => {
      state.cars.push(car);
    },
    DELETE_CAR: (state, id) => {
      var index = state.cars.findIndex((car) => car.id == id);
      state.cars.splice(index, 1);
    },
    EDIT_CAR: (state, car) => {
      Object.assign(
        state.cars[state.cars.findIndex((c) => c.id === car.id)],
        car
      );
    },
    BUY_CAR: (state, car) => {
      state.cars = state.cars.filter((c) => c.id != car.id);
    },
    SET_EDIT_CAR: (state, car) => {
      state.editCar = car;
    },
  },

  // Actions are functions that you call throughout your application that call mutations.
  actions: {
    fetchCars: ({ commit }, payload) => {
      commit("SET_CARS", payload);
    },
    addCar: ({ commit }, payload) => {
      commit("ADD_CAR", payload);
    },
    deleteCar: ({ commit }, payload) => {
      commit("DELETE_CAR", payload);
    },
    editCar: ({ commit }, payload) => {
      commit("EDIT_CAR", payload);
    },
    setCar: ({ commit }, payload) => {
      commit("SET_CAR", payload);
    },
    buyCar: ({ commit }, payload) => {
      commit("BUY_CAR", payload);
    },
    setCarForEdit: ({ commit }, payload) => {
      commit("SET_EDIT_CAR", payload);
      console.log(payload)
    },
  },
};
