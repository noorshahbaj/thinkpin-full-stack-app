import { defineStore } from "pinia";
import axiosClient from "../axios";
import router from "../router";

const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isLoading: false,
  }),
  actions: {
    async fetchUser() {
      if (this.isLoading) return; // Prevent multiple simultaneous fetches

      this.isLoading = true;
      try {
        const response = await axiosClient.get("/api/user");
        this.user = response.data;
        return response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          this.user = null;
        } else {
          console.error("User fetch error:", error);
        }
        throw error;
      } finally {
        this.isLoading = false;
      }
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
