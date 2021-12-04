<template>
  <div>
    <div class="car-list__search-group">
      <ui-form-field>
        <ui-select
          id="full-func-js-select"
          v-model="state.selected"
          :options="options"
          @selected="onSelected($event)"
          >Sort By</ui-select
        >
      </ui-form-field>
      <ui-form-field>
        <label>Search manufacturer:</label>
        <ui-textfield v-model="state.search.manufacturer"></ui-textfield>
      </ui-form-field>
      <ui-form-field>
        <label>Search model:</label>
        <ui-textfield v-model="state.search.model"></ui-textfield>
      </ui-form-field>
    </div>
    <div class="pages">
      <span
        v-for="elem in this.$store.state.pages"
        :class="computedPagesClasses(elem)"
        :key="elem"
        @click="changePage(elem)"
        >{{ elem }}</span
      >
    </div>
    <div class="car-list__wrapper" v-if="this.$store.state.User.user"></div>
    <CarListElement
      :car="elem"
      v-for="elem in cars"
      :key="elem.id"
      @deleteCar="deleteCar"
      @click="showDescription(elem)"
    />

    <div class="pages">
      <span
        v-for="elem in this.$store.state.pages"
        :class="computedPagesClasses(elem)"
        :key="elem"
        @click="changePage(elem)"
        >{{ elem }}</span
      >
    </div>
    <div class="pagesGroup">
      <ui-button @click="increasePage">Next</ui-button>
      <div class="goToGroup">
        <input id="pageIndex" type="number" v-model="state.pageIndex" />
        <ui-button @click="goToPage">Go to</ui-button>
      </div>
      <ui-button @click="decreasePage">Prev</ui-button>
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";
import CarListElement from "@/components/CarListElement.vue";
import { useRouter } from "vue-router";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

const options = [
  {
    label: "By Price Asc",
    value: "priceAsc",
  },
  {
    label: "By Price Desc",
    value: "priceDesc",
  },
];

export default {
  name: "CarList",
  components: {
    CarListElement,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      pageIndex: store.state.pageIndex,
      selected: "",
      noOfPages: 0,
      pages: store.state.pages,
      search: {
        manufacturer: "",
        model: "",
      },
    });

    const router = useRouter();
    const pageIndex = computed(() => {
      console.log(store.state.pageIndex);
      return store.state.pageIndex;
    });
    function computedPagesClasses(elem) {
      if (elem == store.state.pageIndex) {
        return "highlightPage";
      }
      return "page";
    }
    const cars = computed(() => {
      let localCars = Array.from(store.state.Car.cars);
      store.dispatch("setNoOfPages", localCars.length / 10);
      return localCars
        .slice((store.state.pageIndex - 1) * 10, store.state.pageIndex * 10)
        .filter(
          (car) =>
            car.userId != store.state.User.user.id &&
            car.manufacturer.indexOf(state.search.manufacturer) >= 0 &&
            car.model.indexOf(state.search.model) >= 0
        );
    });
    console.log(...store.state.pages);
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

    function sortByPriceDescending() {
      let localCars = store.state.Car.cars;
      localCars.sort(function (a, b) {
        return b.price - a.price;
      });
      store.dispatch("Car/fetchCars", localCars);
      store.dispatch("setPageIndex", 1);
    }

    function sortByPriceAscending() {
      let localCars = store.state.Car.cars;
      localCars.sort(function (a, b) {
        return a.price - b.price;
      });
      store.dispatch("Car/fetchCars", localCars);
      store.dispatch("setPageIndex", 1);
    }

    function onSelected(selected) {
      state.selected = selected.value;
      switch (state.selected) {
        case "priceAsc":
          sortByPriceAscending();
          break;
        case "priceDesc":
          sortByPriceDescending();
          break;
      }
    }

    function changePage(elem) {
      store.dispatch("setPageIndex", elem);
    }

    function increasePage() {
      // let localCars = cars.value;
      console.log(store.state.Car.cars, store.state.Car.cars.length / 10);
      if (store.state.pageIndex < store.state.Car.cars.length / 10 + 1) {
        store.dispatch("setPageIndex", pageIndex.value + 1);
        // store.dispatch("Car/fetchCars", localCars.slice((store.state.pageIndex-1)*10,store.state.pageIndex*10));
      }
    }

    function goToPage() {
      if (
        state.pageIndex < store.state.Car.cars.length / 10 &&
        state.pageIndex > 0
      ) {
        store.dispatch("setPageIndex", state.pageIndex);
      }
    }

    function decreasePage() {
      console.log(store.state.pageIndex);
      if (store.state.pageIndex > 1) {
        store.dispatch("setPageIndex", pageIndex.value - 1);
      }
    }

    function deleteCar(car) {
      store.dispatch("Car/deleteCar", car.id);
    }

    function showDescription(elem) {
      let url = utils.url;
      let requestParam = utils.globalRequestParameters;
      requestParam.method = "GET";
      requestParam.body = null;
      fetch(url + "cars/" + elem.id, requestParam).then((res) => {
        res.json().then((res) => {
          store.dispatch("Car/setCar", res);
          fetch(url + "users/" + elem.userId, requestParam).then((res) => {
            res.json().then((res) => {
              store.dispatch("User/setSeller", res);
              console.log(elem);
              setTimeout(
                () => router.push({ name: "Car", params: { id: elem.id } }),
                2000
              );
            });
          });
        });
      });
    }

    return {
      state,
      cars,
      sortByPriceDescending,
      sortByPriceAscending,
      options,
      onSelected,
      showDescription,
      increasePage,
      pageIndex,
      decreasePage,
      goToPage,
      changePage,
      computedPagesClasses,
      deleteCar,
    };
  },
};
</script>

<style scoped>
.car-list__search-group {
  margin: 0 auto;
  gap: 5px;
}

.mdc-text-field__ripple {
  width: 10px;
}
.mdc-text-field__input {
  width: 10px;
}

.pages {
  margin-top: 25px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.page {
  margin: 5px 5px;
}

.highlightPage {
  margin: 10px 10px;
  color: purple;
  font-weight: 900;
}

.pagesGroup {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 0 auto;
  justify-content: center;
}

.goToGroup{
  width: 10%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin-bottom:100px;
}

</style>
