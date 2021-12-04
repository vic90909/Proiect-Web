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
        <label>Search firstname:</label>
        <ui-textfield v-model="state.search.firstName"></ui-textfield>
      </ui-form-field>
      <ui-form-field>
        <label>Search lastname:</label>
        <ui-textfield v-model="state.search.lastName"></ui-textfield>
      </ui-form-field>
    </div>
    <ui-button @click="increasePage">Next</ui-button>
    <ui-button @click="goToPage">Go to</ui-button>
    <input id="pageIndex" type="number" v-model="state.pageIndex" />
    <ui-button @click="decreasePage">Prev</ui-button>
    <div class="car-list__wrapper" v-if="this.$store.state.User.user">
      <UserListElement
        :user="elem"
        v-for="elem in users"
        :key="elem.id"
        @deleteUser="deleteUser"
        @admin="admin"
      />
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
  </div>
</template>

<script>
import utils from "../utils.js";
import UserListElement from "@/components/UserListElement.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

const options = [
  {
    label: "By First Name Asc",
    value: "firstNameAsc",
  },
  {
    label: "By First Name Desc",
    value: "firstNameDesc",
  },
];

export default {
  name: "UserList",
  components: {
    UserListElement,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      pageIndex: store.state.pageIndex,
      selected: "",
      noOfPages: 0,
      pages: store.state.pages,
      search: {
        firstName: "",
        lastName: "",
      },
    });
    state.selected = "";
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
    const users = computed(() => {
      let localUsers = Array.from(store.state.User.users);
      store.dispatch("setNoOfPages", localUsers.length / 10);
      return localUsers
        .slice((store.state.pageIndex - 1) * 10, store.state.pageIndex * 10)
        .filter(
          (user) =>
            user.firstName.indexOf(state.search.firstName) >= 0 &&
            user.lastName.indexOf(state.search.lastName) >= 0
        );
    });

    let url = utils.url;
    let requestParam = utils.globalRequestParameters;
    requestParam.method = "GET";
    requestParam.body = null;
    if (users.value.length == 0) {
      fetch(url + "users", requestParam).then((res) =>
        res.json().then(async (res) => {
          store.dispatch("User/fetchUsers", res);
        })
      );
    }

    function sortByFirstNameDescending() {
      let localUsers = store.state.User.users;
      localUsers.sort(function (a, b) {
        return (a.firstName > b.firstName) ? -1 : ((b.firstName > a.firstName) ? 1 : 0)
      });
      store.dispatch("User/fetchUsers", localUsers);
      store.dispatch("setPageIndex", 1);
    }

    function sortByFirstNameAscending() {
      let localUsers = store.state.User.users;
      localUsers.sort(function (a, b) {
        return (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0)
      });
      store.dispatch("User/fetchUsers", localUsers);
      store.dispatch("setPageIndex", 1);
    }

    function onSelected(selected) {
      state.selected = selected.value;
      switch (state.selected) {
        case "firstNameAsc":
          sortByFirstNameAscending();
          break;
        case "firstNameDesc":
          sortByFirstNameDescending();
          break;
      }
    }

    function changePage(elem) {
      store.dispatch("setPageIndex", elem);
    }

    function increasePage() {
      if (store.state.pageIndex < store.state.User.users.length / 10 + 1) {
        store.dispatch("setPageIndex", pageIndex.value + 1);
      }
    }

    function goToPage() {
      if (
        state.pageIndex < store.state.User.users.length / 10 &&
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

    function deleteUser(user) {
      store.dispatch("User/deleteUser", user.id);
    }

    function admin(user) {
      store.dispatch("User/refresh", user);
      console.log(user)
    }

    return {
      state,
      users,
      sortByFirstNameDescending,
      sortByFirstNameAscending,
      options,
      onSelected,
      increasePage,
      pageIndex,
      decreasePage,
      goToPage,
      changePage,
      computedPagesClasses,
      deleteUser,
      admin
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
</style>
