<template>
  <div>
    <div v-if="false">{{car.id}}</div>
    <b>{{ car.vehicle }} </b>
    {{car.color}}
    {{car.fuel}}
    {{ car.status ? "Available" : "Unavailable" }}
    {{car.price}} lei/day
    <ui-button raised v-if="isAuthentif" @click="edit">Edit</ui-button>
    <ui-button raised v-if="isAuthentif" @click="deleteCar">Delete</ui-button>
  </div>
</template>

<script>
import utils from "../utils.js";
export default {
  name: "Car",
  props: {
    car: Object,
  },
  data() {
    return {};
  },
  computed: {
    isAuthentif() {
      return this.$store.state.isAuthentif;
    },
  },
  methods: {
    edit() {
      this.$emit("edit", this.car);
      this.$router.push({path: "addEditCar", query: {formAction: true, id: this.car.id, vehicle: this.car.vehicle, 
      color: this.car.color, fuel: this.car.fuel, status: this.car.status, price: this.car.price}});
    },
    deleteCar() {
        let requestParameters = { ...utils.globalRequestParameters };
        let token = window.localStorage.getItem("token");
        requestParameters.headers.Authorization = "Bearer " + token;
        requestParameters.method = "DELETE";
        requestParameters.body = JSON.stringify(this.car);

        fetch(utils.url + "cars/" + this.car.id, requestParameters)
          .then((res) => res.json())
          .then((res) => {
            console.log(res.message);
            if (
              res.message === "Decoding error!" ||
              res.message === "Your token expired!"
            ) {
              console.log("nu ai voie!");
            } else {
              this.$store.dispatch("deleteCar", this.car);
            }
          });
    }
  },
};
</script>

<style>
</style>