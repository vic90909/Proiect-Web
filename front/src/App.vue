<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <table>
      <tr>
        <td>Manufacturer</td>
        <td>Model</td>
        <td>UserId</td>
      </tr>
      
    </table>
        <get-request-async-await/>
  </div>
</template>

<script>
import GetRequestAsyncAwait from "./components/Cars";


export default {
  name: "app",
  components: {
    GetRequestAsyncAwait,
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
