<template>
  <div>
    <div class="gridRow">
      <ui-grid>
        <ui-grid-cell class="gridCell"
          >{{ userCar.manufacturer }}
        </ui-grid-cell>
        <ui-grid-cell>{{ userCar.model }}</ui-grid-cell>
        <ui-grid-cell>{{ userCar.color }}</ui-grid-cell>
        <ui-grid-cell>{{ userCar.price }}</ui-grid-cell>
        <ui-grid-cell>
          <ui-button @click="remove" class="car-component_buy-button"
            >Remove</ui-button
          ></ui-grid-cell
        >
        <ui-grid-cell>
          <ui-button @click="editCar" class="car-component_buy-button"
            >Edit</ui-button
          ></ui-grid-cell
        >
      </ui-grid>
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "UserCarListElement",
  props: {
    car: Object,
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      cara: props.car,
    });

    const userCar = computed(() => state.cara);

    function remove() {
      context.emit("remove", state.cara);
      let requestParameters = utils.globalRequestParameters;
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = token;
      requestParameters.method = "DELETE";
      requestParameters.body = null;
      fetch(utils.url + "cars/" + state.cara.id, requestParameters).then(
        (res) =>
          res.json().then((res) => {
            console.log(res);
          })
      );
    }

    function editCar() {
      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "GET";
      requestParameters.body = null;

      fetch(utils.url + "cars/" + state.cara.id, requestParameters).then(
        (res) => {
          res.json().then((res) => {
            console.log(res);
            store.dispatch("setCarForEdit",res)
            console.log(store.state.Car.editCar);
            router.push({ path: `/editCar/${state.cara.id}` });
          });
        }
      );
    }
    
    return { state, userCar, remove, editCar };
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
