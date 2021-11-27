<template>
  <div id="nav">
    <nav>
      <router-link to="/">
        <div class="navigation__logo">Dealer Shop</div>
      </router-link>
      <div class="navigation__user" v-if="this.$store.state.user">
        {{ this.$store.state.user.firstName }}
      </div>
      <router-link to="/login">
        <div class="navigation__user" v-if="!this.$store.state.user">
          Login
        </div>
      </router-link>
      <router-link to="/login">
        <div class="navigation__user" v-if="!this.$store.state.user">
          Register
        </div>
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

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
</style>
