<template>
  <div>
    <div class="gridRow">
      <ui-grid>
        <ui-grid-cell class="gridCell">{{ car.manufacturer }} </ui-grid-cell>
        <ui-grid-cell>{{ car.model }}</ui-grid-cell>
        <ui-grid-cell>{{ car.color }}</ui-grid-cell>
        <ui-grid-cell>{{ car.price }}</ui-grid-cell>
        <ui-grid-cell>{{ car.plate }}</ui-grid-cell>
        <ui-grid-cell>{{ car.userName }}</ui-grid-cell>

        <ui-grid-cell><ui-button @click="buy">Buy</ui-button></ui-grid-cell>
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

    // edit() {
    //   this.$emit("edit", this.car);
    //   this.$router.push({path: "addEditCar", query: {formAction: true, id: this.car.id, manufacturer: this.car.manufacturer, model: this.car.model,
    //   color: this.car.color, price: this.car.price, plate: this.car.plate, userId: this.car.userId
    //   }});
    // },
    // deleteCar() {
    //     let requestParameters = { ...utils.globalRequestParameters };
    //     let token = window.localStorage.getItem("token");
    //     requestParameters.headers.Authorization = token;
    //     requestParameters.method = "DELETE";
    //     requestParameters.body = JSON.stringify(this.car);

    //     fetch(utils.url + "cars/" + this.car.id, requestParameters)
    //       .then((res) => res.json())
    //       .then((res) => {
    //         console.log(res.message);
    //         if (
    //           res.message === "Decoding error!" ||
    //           res.message === "Your token expired!"
    //         ) {
    //           console.log("nu ai voie!");
    //         } else {
    //           this.$store.dispatch("deleteCar", this.car);
    //         }
    //       });
    // }
  },
};
</script>

<style>
.gridRow {
  border: 2px solid;
  border-radius: 10px;
  transition: all 0.5s ease;
  margin: 50px 75px;
}

/* .gridRow {
  border: 2px solid;
  border-radius: 10px;
  transition: all 0.5s ease;
} */

.gridRow:hover{
  transform: scale(1.1, 1.1);
}

.gridCell {
  border: 1px solid;
  padding: 10px;
}
</style>
