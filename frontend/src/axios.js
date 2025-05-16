import axios from "axios";
import router from "./router.js";
import useUserStore from "./store/user";

let userStore;

// Initialize store outside interceptor to avoid circular dependency
const initializeStore = () => {
  if (!userStore) {
    userStore = useUserStore();
  }
  return userStore;
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const store = initializeStore();
      store.user = null;
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
