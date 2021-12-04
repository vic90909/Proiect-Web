<template>
  <div class="user-profile_wrapper">
    <ui-form-field class="registerGroupClass">
      <ui-textfield v-model="state.editUser.lastName" required input-type="text">
        Last name
      </ui-textfield>
    </ui-form-field>
    <ui-form-field class="registerGroupClass">
      <ui-textfield v-model="state.editUser.firstName" required input-type="text">
        First name
      </ui-textfield>
    </ui-form-field>
    <ui-form-field class="registerGroupClass">
      <ui-textfield
        v-model="state.editUser.email"
        required
        helper-text-id="email-field-helper-text"
        input-type="email"
      >
        Email address
      </ui-textfield>
      <ui-textfield-helper class="registerGroupHelperClass">
        Must be like me@example.com
      </ui-textfield-helper>
    </ui-form-field>
    <ui-form-field class="registerGroupClass">
      <ui-textfield v-model="state.editUser.gender" required input-type="text">
        Gender
      </ui-textfield>
    </ui-form-field>
    <ui-form-field class="registerGroupClass">
      <ui-textfield v-model="state.editUser.jobTitle" required input-type="text">
        Job Title
      </ui-textfield>
    </ui-form-field>
    <ui-form-field class="registerGroupClass">
      <ui-textfield v-model="state.editUser.phone" required input-type="text">
        Phone
      </ui-textfield>
    </ui-form-field>
        <ui-form-field class="registerGroupClass">
     <ui-button @click="edit">Finish Edit</ui-button>
    </ui-form-field>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useValidator, helpers } from "balm-ui";

// const validations = {
//   lastName: {
//     label: "Last name",
//     validator: "required",
//   },
//   firstName: {
//     label: "First name",
//     validator: "required",
//   },
//   email: {
//     label: "Email",
//     validator: "required, email",
//     email: {
//       async validate(value) {
//         return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
//           value
//         );
//       },
//       message: "Email address should be like me@example.com",
//     },
//   },
//   gender: {
//     label: "Gender",
//     validator: "required",
//   },
//   jobTitle: {
//     label: "Job Title",
//     validator: "required",
//   },
//   phone: {
//     label: "Phone",
//     validator: "required",
//   },
// };
import {useStore} from 'vuex'
export default {
  name: "UserProfileDate",
  required: {
    validate(value) {
      return !helpers.isEmpty(value);
    },
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props,context) {
    const store = useStore();
    const state = reactive({
    balmUI: useValidator(),
      user: props.user,
      editUser: {
        id:store.state.User.user.id,
        lastName: store.state.User.user.lastName,
        firstName: store.state.User.user.firstName,
        email: store.state.User.user.email,
        gender: store.state.User.user.gender,
        jobTitle: store.state.User.user.jobTitle,
        phone: store.state.User.user.phone,
      },
    });
    console.log(state.user);

    let fullname = computed(() => {
      return `${state.user.firstName} ${state.user.lastName}`;
    });

    function edit(){
        context.emit("editUser",state.editUser);
    }
    return {
      state,
      fullname,
      edit
    };
  },
};
</script>

<style scoped>
.user-profile_wrapper {
  margin-top: 50px;
  border: 2px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
