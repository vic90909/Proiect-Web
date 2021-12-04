<template>
  <div id="nav">
    <nav>
      <router-link to="/">
        <div class="navigation__logo">Dealer Shop</div>
      </router-link>
      <div class="navigation__user-wrapper">
        <router-link to="/userProfile">
          <div class="navigation__user" v-if="this.$store.state.User.user">
            {{ this.$store.state.User.user.firstName }}
          </div>
        </router-link>
        <router-link to="/userCarList">
          <div class="navigation__user" v-if="this.$store.state.User.user">My Cars</div>
        </router-link>
         <router-link to="/adminUserPanel">
          <div class="navigation__user" v-if="this.$store.state.User.user&&this.$store.state.User.user.isAdmin">Admin User Panel</div>
        </router-link>
        <router-link to="/login">
          <div
            class="navigation__user"
            v-if="this.$store.state.User.user"
            @click="logout"
          >
            Logout
          </div>
        </router-link>
        <router-link to="/login">
          <div class="navigation__user" v-if="!this.$store.state.User.user">
            Login
          </div>
        </router-link>
        <router-link to="/register">
          <div class="navigation__user" v-if="!this.$store.state.User.user">
            Register
          </div>
        </router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    function logout() {
      store.dispatch("login", false);
      store.dispatch("User/setUser", null);
      localStorage.removeItem("token");
      console.log("Dleogare");
    }

    return {
      logout,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f3f5fa;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5%;
  background-color: purple;
  color: white;
  text-decoration: none;
}

a {
  color: inherit;
  text-decoration: none;
}
.navigation__user {
  font-weight: bold;
}
.navigation__logo {
  font-weight: bold;
  font-size: 24px;
}
.navigation__user-wrapper {
  display: flex;
  gap: 25px;
}
</style>
