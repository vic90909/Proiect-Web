import { createRouter, createWebHistory } from "vue-router";
import CarList from "../views/CarList.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UserProfile from "../views/UserProfile.vue";
import Car from "../views/Car.vue";
import UserCarList from "../views/UserCarList.vue";
import AdminUserPanel from "../views/UserList.vue";
import RegisterCar from "../views/RegisterCar.vue";
import EditCar from "../views/EditCar.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: CarList,
    props: {
      header: true,
      content: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/userProfile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/carDetails/:id",
    name: "Car",
    component: Car,
  },
  {
    path: "/userCarList/",
    name: "UserCars",
    component: UserCarList,
  },
  {
    path: "/adminUserPanel/",
    name: "AdminUserPanel",
    component: AdminUserPanel,
  },
  {
    path: "/registerCar/",
    name: "RegisterCar",
    component: RegisterCar,
  },
  {
    path: "/editCar/:id",
    name: "EditCar",
    component: EditCar,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Register" || to.name === "Login") next();
  else if (to.name == "AdminUserPanel" && !store.state.User.user && !store.state.User.user.isAdmin)
    next({ name: "Login" });
  else if (to.name !== "Login" && !store.state.User.user)
    next({ name: "Login" });
  else next();
});

export default router;
