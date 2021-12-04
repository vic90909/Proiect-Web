<template>
  <div>
    <UserProfileData :user="user" v-show="!isEditable" />
    <UserProfileDataEditable
      :user="user"
      @editUser="editUser"
      v-show="isEditable"
    />
    <ui-button class="user-profile__buttons" @click="edit" v-show="!isEditable"
      >Edit</ui-button
    >

    <ui-button
      class="user-profile__buttons"
      @click="cancelEdit"
      v-show="isEditable"
      >Cancel Edit</ui-button
    >

    <ui-button
      class="user-profile__buttons"
      @click="deleteAccount"
      v-show="!isEditable"
      >Delete account</ui-button
    >
  </div>
</template>

<script>
import UserProfileData from "@/components/UserProfileData.vue";
import UserProfileDataEditable from "@/components/UserProfileDataEditable.vue";
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import {useRouter} from 'vue-router';
import utils from "../utils.js";

export default {
  name: "UserProfile",
  components: { UserProfileData, UserProfileDataEditable },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      user: store.state.User.user,
      isEditable: store.state.isEditable,
    });

    const isEditable = computed(() => store.state.isEditable);
    const user = computed(() => store.state.User.user);

    function edit() {
      store.dispatch("setEditable", true);
    }

    function cancelEdit() {
      store.dispatch("setEditable", false);
    }

    function deleteAccount() {
      store.dispatch("login", false);
      store.dispatch("User/setUser", null);
      localStorage.removeItem("token");
      let url = utils.url;
      let requestParam = utils.globalRequestParameters;
      requestParam.method = "DELETE";
      requestParam.body = null
      fetch(url + "users/" + state.user.id, requestParam).then((res) => {
        console.log(res);
      });
      router.push({path:"/login"});
    }

    function editUser(user) {
      if (store.state.isEditable) {
        store.dispatch("setEditable", false);
        store.dispatch("User/setUser", user);

        let url = utils.url;
        let requestParam = utils.globalRequestParameters;
        requestParam.method = "PUT";
        requestParam.body = JSON.stringify(user);
        fetch(url + "users/user/" + user.id, requestParam).then((res) => {
          console.log(res);
        });
      }
    }

    return {
      state,
      edit,
      isEditable,
      editUser,
      user,
      cancelEdit,
      deleteAccount,
    };
  },
};
</script>

<style scoped>
.mdc-button__ripple {
  color: white;
}

.user-profile__buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 15px;
  margin-top: 10px;
}
</style>
