import { defineStore } from "pinia";
import axiosClient from "../axios";
import router from "../router";

const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    fetchUser() {
      return axiosClient.get("/api/user").then(({ data }) => {
        console.log(data);
        this.user = data;
      });
    },
    async logout() {
      try {
        await axiosClient.post("/logout");
        this.user = null;
        router.push({ name: "Login" });
      } catch (error) {
        console.error("Logout failed:", error);
        this.user = null;
        router.push({ name: "Login" });
      }
    },
  },
});

export default useUserStore;
