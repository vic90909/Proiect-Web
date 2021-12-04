<template>
  <div class="login">
    <h1 class="login__title">Welcome</h1>
    <div class="login__side">
      <img id="logo" alt="logo" src="../assets/logo.png" />
      <ui-form type="|" item-margin-bottom="16" action-align="center">
        <template #default="{ actionClass }">
          <div id="loginGroup">
            <ui-form-field class="loginGroupClass">
              <ui-textfield
                v-model="formData.email"
                required
                input-type="email"
              >
                Email address
              </ui-textfield>
            </ui-form-field>
            <ui-form-field class="loginGroupClass">
              <ui-textfield
              class="loginGroupField"
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
            <div>
              <ui-button raised @click="login()">Login</ui-button>
            </div>
          </ui-form-field>
        </template>
      </ui-form>
    </div>
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
        email: "OrieLittle@gmail.com",
        password: "Little",
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
              fetch(utils.url + "users/" + id, requestParameters).then(
                (res) => {
                  res.json().then((res) => {
                    console.log("Jos de tot");
                    this.$store.dispatch("User/setUser", res);
                    console.log(this.$store.state.User.user);

                    this.$router.push("/");
                  });
                }
              );
            }
          });
        });
      }
    },
  },
};
</script>

<style lang="scss">
#loginGroup {
  width: 24%;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 50px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}

.loginGroupClass {
  display: flex;
  flex-direction: column;
  padding: 3px;
  border-radius: 10px;
}

.loginGroupField{
  width: 25%;
}

.login__title {
  margin: 0 auto;
  margin-top: 100px;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login__side{
  display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 5%;
}

#logo{
  width: 100%;
}
</style>
