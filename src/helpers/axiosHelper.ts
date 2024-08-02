import axios, { AxiosInstance } from "axios";
import { BASEAPI } from "../config/baseURL";
import { authActions, resetSelections } from "../redux/actions/combineAction";
import store, { persistor } from "../redux/store";
import toast from "../services/toast";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEAPI,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "app-id": 3,
    "client-id": 101212,
  },
});

// Function to update headers
const updateAxiosHeaders = () => {
  const state = store.getState();
  const franchiseeId = state.franchisee.franchiseeId;
  const pickupPointId = state.franchisee.pickupPointDetails?.id;

  axiosInstance.defaults.headers.common["franchiseeId"] = franchiseeId;
  axiosInstance.defaults.headers.common["pickupPointId"] = pickupPointId;
};

// Initial update
updateAxiosHeaders();

// Subscribe to store changes
store.subscribe(updateAxiosHeaders);

axiosInstance?.interceptors?.response?.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      toast.danger({
        message:
          error?.response?.data?.errors[0].message ??
          "token Expired Please login Again",
      });

      store?.dispatch(authActions?.logout());
      persistor.purge();
      store?.dispatch(resetSelections());
    } else {
      console.log(error?.response?.status, "erorr status from api");
      return error?.response?.status;
    }
    console.log(error, "error from api");
    return error?.response?.status;
  }
);

export const setToken = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = token;
};
