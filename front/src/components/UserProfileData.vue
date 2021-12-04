<template>
  <div class="user-profile_wrapper" >
    <h1>Name: {{ fullname }}</h1>
    <h1>Email: {{ state.user.email }}</h1>
    <h1>Gender: {{ state.user.gender }}</h1>
    <h1>Job Title: {{ state.user.jobTitle }}</h1>
    <h1>Phone: {{ state.user.phone }}</h1>

  </div>
</template>

<script>
import {reactive, computed} from 'vue'
export default {
  name: "UserProfileDate",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const state = reactive({
        user: props.user
    })
    console.log(state.user)

    let fullname = computed(()=>{
        return `${state.user.firstName} ${state.user.lastName}`;
    })
    return{
        state,
        fullname
    }
  },
};
</script>

<style scoped>
.user-profile_wrapper{
    margin-top: 50px;
    border: 2px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
