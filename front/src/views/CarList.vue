<template>
  <div>
    <ui-button @click="sortByPriceDescending"
      >Sort by price descending</ui-button
    >
    <ui-button @click="sortByPriceAscending">Sort by price ascending</ui-button>
    <div class="car-list__wrapper" v-if="this.$store.state.user">
      <Car :car="elem" v-for="elem in cars" :key="elem.id" />
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";
import Car from "@/components/Car.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CarList",
  components: {
    Car,
  },
  setup() {
    const state = reactive({
      formData: {
        id: "",
        manufacturer: "",
        model: "",
        color: "",
        plate: "",
        price: "",
        userId: "",
        userName: "",
      },
    });
    const store = useStore();
    const cars = computed(() => {
      return store.state.cars.filter(car => car.userId!=store.state.userId);
    });

    let url = utils.url;
    let requestParam = utils.globalRequestParameters;
    if (cars.value.length == 0) {
      fetch(url + "cars", requestParam).then((res) =>
        res.json().then(async (res) => {
          console.log(cars.value);
          console.log(res);
          store.dispatch("fetchCars", res);
          fetch(url + "users", requestParam).then((users) =>
            users.json().then((users) => {
              for (let car of res) {
                let userCar = Object.values(users).find(
                  (a) => a.id == car.userId
                );
                car.userName = userCar.lastName + " " + userCar.firstName;
              }
            })
          );
        })
      );
    }

    function sortByPriceDescending() {
      console.log(store.state.userId);
      let localCars = cars.value;
      console.log(localCars);
      localCars.sort(function (a, b) {
        return b.price - a.price;
      });
      store.dispatch("fetchCars", localCars);
    }

    function sortByPriceAscending() {
      console.log(store.state.userId);
      let localCars = cars.value;
      console.log(localCars);
      localCars.sort(function (a, b) {
        return a.price - b.price;
      });
      store.dispatch("fetchCars", localCars);
    }

    return {
      state,
      cars,
      sortByPriceDescending,
      sortByPriceAscending,
    };
  },
  // data() {
  //   return {
  //     formData: {
  //       id: "",
  //       manufacturer: "",
  //       model: "",
  //       color: "",
  //       plate: "",
  //       price: "",
  //       userId: "",
  //       userName: "",
  //     },
  //   };
  // },
  // async mounted() {
  //   let url = utils.url;
  //   let cars = [];
  //   let requestParam = utils.globalRequestParameters;
  //   if (!this.cars.length) {
  //     await fetch(url + "cars", requestParam).then((res) =>
  //       res.json().then(async (res) => {
  //         cars = res
  //         console.log(this.$store.state.userId)
  //         console.log(cars)
  //         console.log(res)
  //         await fetch(url + "users", requestParam).then((res) =>
  //           res.json().then(async (res) => {
  //             for (let car of cars) {
  //               let userCar = Object.values(res).find(a => a.id==car.userId)
  //               car.userName = userCar.lastName+" " + userCar.firstName;
  //             }
  //             this.$store.dispatch("fetchCars", cars);
  //           })
  //         );
  //       })
  //     );
  //   }
  // },
  // computed: {
  //   cars() {
  //     return this.$store.state.cars;
  //   },
  // },
};
</script>
