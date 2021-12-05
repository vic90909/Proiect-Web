<template>
  <div>
    <h1>Edit car</h1>
    <ui-form type="|" item-margin-bottom="16" action-align="center">
      <template #default="{ actionClass }">
        <div id="registerGroup">
          <ui-form-field class="registerGroupClass">
            <ui-textfield
              v-model="state.form.manufacturer"
              required
              input-type="text"
            >
              Manufacturer
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield v-model="state.form.model" required input-type="text">
              Model
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield
              v-model="state.form.price"
              required
              helper-text-id="email-field-helper-text"
              input-type="email"
            >
              Price
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield v-model="state.form.plate" required input-type="text">
              Plate
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield v-model="state.form.color" required input-type="text">
              Color
            </ui-textfield>
          </ui-form-field>
          <ui-form-field class="registerGroupClass">
            <ui-textfield v-model="state.form.description" required input-type="text">
              Description
            </ui-textfield>
          </ui-form-field>
          <ui-alert v-if="message" state="error">{{ message }}</ui-alert>
          <ui-form-field :class="actionClass">
            <ui-button raised @click="registerCar()">Submit Edit</ui-button>
            <ui-button outlined>Cancel</ui-button>
          </ui-form-field>
        </div>
      </template>
    </ui-form>
    <div></div>
  </div>
</template>

<script>
import utils from "../utils.js";
import { useValidator, helpers } from "balm-ui";
import { useToast } from "balm-ui";
// import { useRouter } from "vue-router";

const validations = {
  manufacturer: {
    label: "Manufacturer",
    validator: "required",
  },
  model: {
    label: "Model",
    validator: "required",
  },
  price: {
    label: "Price",
    validator: "required",
  },
  plate: {
    label: "Plate",
    validator: "required",
  },
  color: {
    label: "Color",
    validator: "required",
  },
  description: {
    label: "Description",
    validator: "required",
  },
};
const $toast = useToast();
import { reactive } from "vue";
import { useStore } from 'vuex';
export default {
  name: "EditCar",
  required: {
    validate(value) {
      return !helpers.isEmpty(value);
    },
    message: "%s is required",
  },
  setup() {
    // const router = useRouter();
    const store = useStore();
    const state = reactive({
      balmUi: useValidator(),
      validations,
      form: {
        manufacturer: store.state.Car.editCar.manufacturer,
        model: store.state.Car.editCar.model,
        price: store.state.Car.editCar.price,
        plate: store.state.Car.editCar.plate,
        color: store.state.Car.editCar.color,
        description: store.state.Car.editCar.description,
      },
      car: null,
      mesaj: "",
      message: "",
      controls: {
        helperText: true,
        isVisible: true,
      },
    });

    function registerCar() {
      let result = state.balmUi.validate(state.form);
      let { valid, message } = result;
      state.message = message;

      if (valid) {
        console.log(store.state.Car.editCar)
        let data = {
          id: store.state.Car.editCar.id,
          manufacturer: state.form.manufacturer,
          model: state.form.model,
          plate: state.form.plate,
          price: state.form.price,
          color: state.form.color,
          userId: store.state.Car.editCar.userId,
          description: state.form.description,
        };

        let requestParameters = utils.globalRequestParameters;
        requestParameters.method = "PUT";
        requestParameters.body = JSON.stringify(data);

        fetch(utils.url + "cars/"+store.state.Car.editCar.id, requestParameters).then((res) => {
          res.text().then(() => {
            $toast("Car edited successfully");
            store.dispatch("Car/editCar", data);
          });
        });
      }
    }
    return {
      state,
      registerCar,
    };
  },
  // data() {
  //   return {
  //     balmUI: useValidator(),
  //     validations,
  //     form: {
  //       manufacturer: props.car.manufacturer,
  //       model: props.car.model,
  //       price: props.car.price,
  //       plate: props.car.plate,
  //       color: props.car.color,
  //       description: props.car.description,
  //     },
  //     mesaj: "",
  //     message: "",
  //     controls: {
  //       helperText: true,
  //       isVisible: true,
  //     },
  //   };
  // },
  // methods: {
  //   registerCar() {
  //     let result = this.balmUI.validate(this.form);
  //     let { valid, message } = result;
  //     this.message = message;

  //     if (valid) {
  //       let data = {
  //         id: props.car.id,
  //         manufacturer: this.form.manufacturer,
  //         model: this.form.model,
  //         plate: this.form.plate,
  //         price: this.form.price,
  //         color: this.form.color,
  //         userId: this.$store.state.User.user.id,
  //         description: this.form.description,
  //       };

  //       let requestParameters = utils.globalRequestParameters;
  //       requestParameters.method = "PUT";
  //       requestParameters.body = JSON.stringify(data);

  //       fetch(utils.url + "cars", requestParameters).then((res) => {
  //         res.text().then((res) => {
  //           data.id = res;
  //           console.log(data);
  //           $toast("Car added successfully");
  //           this.$store.dispatch("Car/addCar", data);
  //         });
  //       });
  //     }
  //   },
  // },
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
