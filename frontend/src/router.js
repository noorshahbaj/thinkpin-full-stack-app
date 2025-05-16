import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import MyImages from "./pages/MyImages.vue";
import NotFound from "./pages/NotFound.vue";
import Signup from "./pages/Signup.vue";
import useUserStore from "./store/user";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "/", name: "Home", component: Home },
      { path: "/images", name: "MyImages", component: MyImages },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isGuest: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { isGuest: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.isGuest) {
    return next();
  }

  try {
    if (!userStore.user && !to.meta.isGuest) {
      await userStore.fetchUser();
    }

    if (to.meta.requiresAuth && !userStore.user) {
      return next({ name: "Login", query: { redirect: to.fullPath } });
    }

    next();
  } catch (error) {
    if (error.response?.status === 401) {
      userStore.user = null;
      if (to.name !== "Login") {
        return next({ name: "Login" });
      }
    }
    console.error("Router error:", error);
    next({ name: "NotFound" });
  }
});

export default router;
