<template>
  <div>
    <CarDescription :car="car" :seller="seller" />
  </div>
</template>

<script>
// import utils from "../utils.js";
import CarDescription from "@/components/CarDescription.vue";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    CarDescription,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      id: router.currentRoute.value.params.id,
      car: store.state.Car.car,
      seller: store.state.User.seller,
    });

    let car = computed(() => state.car);
    let seller = computed(() => state.seller);



    return {
      state,
      car,
      seller,
    };
  },
};
</script>

<style></style>
