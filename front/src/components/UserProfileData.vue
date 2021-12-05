<template>
  <div class="user-profile_wrapper" >
        <label><strong>Name:</strong> {{ fullname }}</label>
        <label><strong>Gender:</strong> {{ userr.gender }}</label>
        <label><strong>Email:</strong> {{ userr.email }}</label>
        <label><strong>Job Title:</strong> {{ userr.jobTitle }}</label>
        <label><strong>Phone:</strong> {{ userr.phone }}</label>
  </div>
  
</template>

<script>
import {reactive, computed} from 'vue'
import {useStore} from 'vuex'
export default {
  name: "UserProfileDate",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
        user: store.state.User.user
    })

    let fullname = computed(()=>{
        return `${store.state.User.user.firstName} ${store.state.User.user.lastName}`;
    })

    let userr = computed(()=>{
      return store.state.User.user
    })
    return{
        state,
        fullname,
        userr
    }
  },
};
</script>

<style scoped>
.user-profile_wrapper{
    margin: 50px 30%;
    padding:25px;
    border: 2px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap:10px;
    align-items: center;
}
</style>
