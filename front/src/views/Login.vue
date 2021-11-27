<template>
  <div>
    <h1>Log In</h1>
    <ui-form type="|" item-margin-bottom="16" action-align="center">
      <template #default="{ actionClass }">
        <div id="loginGroup">
          <ui-form-field class="loginGroupClass">
            <ui-textfield v-model="formData.email" required input-type="email">
              Email address
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="loginGroupClass">
            <ui-textfield
              v-model="formData.password"
              input-type="password"
              required
              pattern=".{8,}"
              :attrs="{ autocomplete: 'current-password' }"
              >Password</ui-textfield
            >
          </ui-form-field>
        </div>

        <ui-alert v-if="message" state="error">{{ message }}</ui-alert>
        <ui-form-field :class="actionClass">
          <ui-button raised @click="login()">Login</ui-button>
        </ui-form-field>
      </template>
    </ui-form>
    <div>
      {{ mesaj }}
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";
import { useValidator, helpers } from "balm-ui";

const validations = {
  email: {
    label: "Email",
    validator: "required, email",
    email: {
      validate(value) {
        return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          value
        );
      },
      message: "Email address should be like me@example.com",
    },
  },
  password: {
    label: "Password",
    validator: "required, password",
    password: {
      validate(value) {
        return /^\w+$/.test(value);
      },
      message: "%s must be a letter, digit or underline",
    },
  },
};

export default {
  name: "Login",

  required: {
    validate(value) {
      return !helpers.isEmpty(value);
    },
    message: "%s is required",
  },
  data() {
    return {
      balmUI: useValidator(),
      validations,
      formData: {
        email: "",
        password: "",
      },
      mesaj: "",
      message: "",
      controls: {
        helperText: true,
        isVisible: true,
      },
    };
  },
  methods: {
    login() {
      let result = this.balmUI.validate(this.formData);
      let { valid, message } = result;
      this.message = message;
      console.log(`Vrei sa te autentifici cu email: ${this.formData.email}`);

      if (valid) {
        let data = {
          email: this.formData.email,
          password: this.formData.password,
        };

        let requestParameters = utils.globalRequestParameters;
        requestParameters.method = "POST";
        requestParameters.body = JSON.stringify(data);

        fetch(utils.url + "login", requestParameters).then((res) => {
          res.json().then((res) => {
            this.mesaj = res.message;
            console.log("token:" + res.token);
            if (res.token) {
              localStorage.setItem("token", res.token);
              console.log("token:" + res.token);
              console.log("id:" + res.id);
              let id = res.id;
              requestParameters.method = "GET";
              requestParameters.body = null;
              this.$store.dispatch("login", true);
              fetch(utils.url + "users/"+id, requestParameters).then((res) => {
                res.json().then((res)=>{
                  this.$store.dispatch("setUser", res);
                  this.$router.push("/");
                })
              })
              
            }
          });
        });
      }
    },
  },
};
</script>

<style>
#loginGroup {
  width: 100%;
  text-align: center;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}

.loginGroupClass {
  display: inline-block;
  margin: 0 auto;
  padding: 3px;
  border-radius: 10px;
  background-color: #f34d00;
}
</style>
