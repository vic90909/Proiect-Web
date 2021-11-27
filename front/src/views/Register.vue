<template>
  <div>
    <h1>Register</h1>
    <ui-form type="|" item-margin-bottom="16" action-align="center">
      <template #default="{ actionClass }">
        <div id="registerGroup">
          <ui-form-field class="registerGroupClass">
            <ui-textfield
              v-model="formData.lastName"
              required
              input-type="text"
            >
              Last name
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield
              v-model="formData.firstName"
              required
              input-type="text"
            >
              First name
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield
              v-model="formData.email"
              required
              helper-text-id="email-field-helper-text"
              input-type="email"
            >
              Email address
            </ui-textfield>
            <ui-textfield-helper
              v-if="controls.helperText"
              id="email-field-helper-text"
              :visible="controls.isVisible"
              class="registerGroupHelperClass"
            >
              Must be like me@example.com
            </ui-textfield-helper>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield v-model="formData.gender" required input-type="text">
              Gender
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield
              v-model="formData.jobTitle"
              required
              input-type="text"
            >
              Job Title
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield v-model="formData.phone" required input-type="text">
              Phone
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield
              v-model="formData.password"
              input-type="password"
              required
              pattern=".{8,}"
              helper-text-id="pw-validation-msg"
              :attrs="{ autocomplete: 'current-password' }"
              >Choose password</ui-textfield
            >
            <ui-textfield-helper
              id="pw-validation-msg"
              visible
              validMsg
              class="registerGroupHelperClass"
            >
              Must be at least 8 characters long
            </ui-textfield-helper>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield
              v-model="formData.repassword"
              input-type="password"
              required
            >
              Repeat Password
            </ui-textfield>
          </ui-form-field>
          <ui-alert v-if="message" state="error">{{ message }}</ui-alert>
          <ui-form-field :class="actionClass">
            <ui-button raised @click="register()">Submit</ui-button>
            <ui-button outlined>Cancel</ui-button>
          </ui-form-field>
        </div>
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
// import {useRouter} from 'vue';
const validations = {
  lastName: {
    label: "Last name",
    validator: "required",
  },
  firstName: {
    label: "First name",
    validator: "required",
  },
  email: {
    label: "Email",
    validator: "required, email",
    email: {
      async validate(value) {
        return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          value
        );
      },
      message: "Email address should be like me@example.com",
    },
  },
  gender: {
    label: "Gender",
    validator: "required",
  },
  jobTitle: {
    label: "Job Title",
    validator: "required",
  },
  phone: {
    label: "Phone",
    validator: "required",
  },
  password: {
    label: "Password",
    validator: "required, password, minRule",
    password: {
      validate(value) {
        return /^\w+$/.test(value);
      },
      message: "%s must be a letter, digit or underline",
    },
    minRule: {
      validate(value) {
        return value.trim().length >= 8;
      },
      message: "%s minLength >= 8",
    },
  },
  repassword: {
    label: "Repeat Password",
    validator: "required, password, repasswordRule",
    password: {
      validate(value) {
        return /^\w+$/.test(value);
      },
      message: "%s must be a letter, digit or underline",
    },
    repasswordRule: {
      validate(value, data) {
        return value === data.password;
      },
      message: "Passwords don't match",
    },
  },
};

export default {
  name: "Register",
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
        lastName: "",
        firstName: "",
        email: "",
        gender: "",
        jobTitle: "",
        phone: "",
        password: "",
        repassword: "",
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
    register() {
      let result = this.balmUI.validate(this.formData);
      let { valid, message } = result;
      this.message = message;

      if (valid) {
        let data = {
          lastName: this.formData.lastName,
          firstName: this.formData.firstName,
          email: this.formData.email,
          gender: this.formData.gender,
          jobTitle: this.formData.jobTitle,
          phone: this.formData.phone,
          password: this.formData.password,
        };

        let requestParameters = utils.globalRequestParameters;
        requestParameters.method = "POST";
        requestParameters.body = JSON.stringify(data);

        fetch(utils.url + "register", requestParameters).then((res) => {
          res.json().then((res) => {
            this.mesaj = res.message;
            console.log(this.mesaj);
            if (new String(this.mesaj).valueOf() != new String("User already registered.").valueOf()) {
              this.$router.push("/login");
            }
          });
        });
      }
    },
  },
};
</script>

<style>
.mdc-text-field {
  min-width: 300px;
}
#registerGroup {
  width: 100%;
  text-align: center;
  margin: 100px 0 100px 0;
  display: flex;
  flex-direction: column;
}

.registerGroupClass {
  margin: 0 auto;
  padding: 3px;
  border-radius: 10px;
  border: 2px solid #f34d00;
  display: flex;
  flex-direction: column;
}

.registerGroupHelperClass {
  size: 50px;
}
</style>
