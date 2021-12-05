<template>
  <div>
    <div class="buttonAdd">
      <ui-button @click="addNewCar">Add New Car</ui-button>
    </div>
    <div class="car-list__wrapper" v-if="this.$store.state.User.user">
      <UserCarListElement
        :car="elem"
        @remove="remove"
        v-for="elem in cars"
        :key="elem.id"
      />
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";
import UserCarListElement from "@/components/UserCarListElement.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "UserCarList",
  components: {
    UserCarListElement,
  },
  setup() {
    const router = useRouter();
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
      return store.state.Car.cars.filter(
        (car) => car.userId == store.state.User.user.id
      );
    });

    function remove(userCar) {
      store.dispatch("Car/deleteCar", userCar.id);
    }

    let url = utils.url;
    let requestParam = utils.globalRequestParameters;
    requestParam.method = "GET";
    requestParam.body = null;

    if (cars.value.length == 0) {
      fetch(url + "cars", requestParam).then((res) =>
        res.json().then(async (res) => {
          store.dispatch("Car/fetchCars", res);
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

    function addNewCar() {
      router.push({ path: "/registerCar" });
    }

    return {
      state,
      cars,
      remove,
      addNewCar,
    };
  },
};
</script>

<style scoped>
.car-list__search-group {
  margin: 0 auto;
  gap: 5px;
}

.mdc-button__ripple {
  color: white;
  width: 500px;
}

.mdc-button{
    width: 100%;
    margin: 50px 100px 25px 100px;
}

.buttonAdd {
  display: flex;
  justify-content: center;
}
</style>
