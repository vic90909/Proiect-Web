<template>
  <div>
    <div class="gridRow">
      <ui-grid>
        <ui-grid-cell class="gridCell">{{ user.firstName }} </ui-grid-cell>
        <ui-grid-cell>{{ user.lastName }}</ui-grid-cell>
        <ui-grid-cell>{{ user.gender }}</ui-grid-cell>
        <ui-grid-cell>{{ user.jobTitle }}</ui-grid-cell>
        <ui-grid-cell>{{ user.phone }}</ui-grid-cell>
        <ui-grid-cell>{{ user.email }}</ui-grid-cell>
        <ui-grid-cell>{{
          user.isAdmin ? "Is Admin" : "Not An Admin"
        }}</ui-grid-cell>
        <ui-grid-cell></ui-grid-cell>
        <ui-grid-cell></ui-grid-cell>
        <ui-grid-cell>
          <ui-button @click="makeAdmin(user)"
            >Make Admin</ui-button
          ></ui-grid-cell
        >
        <ui-grid-cell>
          <ui-button @click="removeAdmin(user)"
            >Unmake Admin</ui-button
          ></ui-grid-cell
        >
        <ui-grid-cell>
          <ui-button @click="deleteUser(user)">Delete</ui-button></ui-grid-cell
        >
      </ui-grid>
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";
export default {
  name: "UserListElement",
  props: {
    user: Object,
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
    deleteUser(user) {
      this.$emit("deleteUser", user);
      let requestParameters = utils.globalRequestParameters;
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = token;
      requestParameters.method = "DELETE";
      requestParameters.body = null;
      fetch(utils.url + "users/" + user.id, requestParameters).then((res) =>
        res.json().then((res) => {
          console.log(res);
        })
      );
    },
    makeAdmin(user) {
      user.isAdmin = true;
      this.$emit("admin", user);
      let requestParameters = utils.globalRequestParameters;
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = token;
      requestParameters.method = "PUT";
      requestParameters.body = JSON.stringify({ isAdmin: true });
      console.log(utils.url + "users/admin/" + user.id);
      fetch(utils.url + "users/admin/" + user.id, requestParameters).then(
        (res) =>
          res.text().then((res) => {
            console.log(res);
          })
      );
    },

    removeAdmin(user) {
      user.isAdmin = false;
      this.$emit("admin", user);
      let requestParameters = utils.globalRequestParameters;
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = token;
      requestParameters.method = "PUT";
      requestParameters.body = JSON.stringify({ isAdmin: false });
      console.log(utils.url + "users/admin/" + user.id);
      fetch(utils.url + "users/admin/" + user.id, requestParameters).then(
        (res) =>
          res.text().then((res) => {
            console.log(res);
          })
      );
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
