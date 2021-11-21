<template>
  <div class="card text-center m-3">
    <h5 class="card-header">GET Request with Async/Await</h5>
    <div class="card-body">Total vue packages: {{totalVuePackages}}</div>
  </div>
</template>

<script>
export default {
  name: "get-request-async-await",
  data() {
    return {
      totalVuePackages: null
    };
  },
  async created() {
    // GET request using fetch with async/await
    const response = await fetch("http://127.0.0.1:3000/cars");
    const data = await response.json();
    this.totalVuePackages = data
  }
};
</script>