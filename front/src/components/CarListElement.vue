<template>
  <div>
    <div class="gridRow">
      <ui-grid>
        <ui-grid-cell class="gridCell">{{ car.manufacturer }} </ui-grid-cell>
        <ui-grid-cell>{{ car.model }}</ui-grid-cell>
        <ui-grid-cell>{{ car.color }}</ui-grid-cell>
        <ui-grid-cell>{{ car.price }}</ui-grid-cell>
        <ui-grid-cell>
          <ui-button @click="buy" class="car-component_buy-button" v-if="!this.$store.state.User.user.isAdmin"
            >Buy</ui-button
          ></ui-grid-cell
        >
        <ui-grid-cell>
          <ui-button @click="deleteCar(car)" class="car-component_buy-button" v-if="this.$store.state.User.user.isAdmin"
            >Delete</ui-button
          ></ui-grid-cell
        >

         
        >
      </ui-grid>
    </div>
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
    buy() {
      this.$emit("buy", this.car);
      let requestParameters = { ...utils.globalRequestParameters };
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = token;
      requestParameters.method = "POST";
      requestParameters.body = JSON.stringify(this.car);

      fetch(
        utils.url + "cars/" + this.car.id + "/" + this.user.id,
        requestParameters
      )
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
    },

    deleteCar(car){
      this.$emit("deleteCar",car);
      let requestParameters = utils.globalRequestParameters
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = token;
      requestParameters.method = "DELETE";
      requestParameters.body = null;
      fetch(utils.url + "cars/" + car.id, requestParameters).then((res) =>
        res.json().then((res) => {
          console.log(res);
        })
      )
    },

  },
};
</script>

<style scoped>
.gridRow {
  border: 2px solid;
  border-radius: 10px;
  transition: all 0.5s ease;
  margin: 50px 100px;
}

.gridRow:hover {
  transform: scale(1.1, 1.1);
}

.gridCell {
  border: 1px solid;
  padding: 10px;
}

.mdc-button__ripple {
  color: white;
}
</style>
