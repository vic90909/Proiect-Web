<template>
  <div class="car-description">
    <div class="car-description__wrapper">
      <div class="car-description__wrapper-left">
        <label
          ><strong>Manufacturer:</strong> {{ state.car.manufacturer }}</label
        >
        <label><strong>Model:</strong> {{ state.car.model }}</label>
        <label><strong>Price:</strong> {{ state.car.price }}</label>
        <label><strong>Color:</strong> {{ state.car.color }}</label>
        <label><strong>Plate:</strong> {{ state.car.plate }}</label>
      </div>
      <div class="car-description__wrapper-right">
        <label
          ><strong>Description:</strong> {{ state.car.manufacturer }}</label
        >
      </div>
      <div class="car-description__wrapper-right">
        <label><strong>First Name:</strong> {{ state.seller.firstName }}</label>
        <label><strong>Last Name:</strong> {{ state.seller.lastName }}</label>
        <label><strong>Phone:</strong> {{ state.seller.phone }}</label>
        <label><strong>Email:</strong> {{ state.seller.email }}</label>
        <ui-button @click="call">Call Seller</ui-button>
      </div>
    </div>
    <ui-button @click="buy">Buy Car</ui-button>
  </div>
</template>

<script scoped>
import { reactive } from "vue";
import utils from "../utils.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "CarDescription",
//   props: {
//     car: {
//       type: Object,
//     },
//     seller: {
//       type: Object,
//     },
//   },

  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      car: store.state.Car.car,
      seller: store.state.User.seller,
      buyer: store.state.User.user,
    });


    function call() {
      alert(`Calling ${state.seller.phone}...`);
    }

    function buy() {
      let body = {
        idSeller: state.seller.id,
        idBuyer: state.buyer.id,
      };
      let url = utils.url;
      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "PUT";
      requestParameters.body = JSON.stringify(body);
      fetch(url + "cars/sell/" + state.car.id, requestParameters).then(() => {
          console.log("Intra in fetch")
        store.dispatch("Car/buyCar", state.car)
        setTimeout( () => router.push({ path: `/` }),5000);
      });
    }

    return {
      state,
      call,
      buy,
    };
  },
};
</script>

<style>
.car-description {
  display: flex;
  flex-direction: column;
  margin: 5% 10%;
}

@media (min-width: 1000px) {
  .car-description__wrapper {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    grid-gap: 5%;
  }
}

.car-description__wrapper-left {
  margin: 75px 50px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.car-description__wrapper-right {
  margin: 75px 50px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.mdc-button__ripple {
  color: white;
}
</style>
