import { axiosInstance } from "../helpers/axiosHelper";
import { LoginPayload } from "../redux/reducers/authSlice";
import { GLOBAL_CONSTANT } from "../static/globalConstant";
export const authAPI = {
  login: (data: LoginPayload) => axiosInstance.post("user/login", data),
};
export const passwordAPI = {
  forgot: (data: Object) => axiosInstance.put(`user/resetPassword`, data),
  changePassword: (data: Object) =>
    axiosInstance.put("user/changePassword", data),
};
export const validationAPI = {
  sendOTP: ({ mobile, prefix, from }: any) =>
    axiosInstance.get(
      `sendOtp?mobile=${mobile}&countryCode=${prefix}&from=${from}`
    ),
  verifyOTP: (data: Object) => axiosInstance.post("validateOtp", data),
};

export const ProfileAPI = {
  getProfile: ({ id }: any) => axiosInstance.get(`users/${id}`),
  setFirebaseToken: (data: Object) =>
    axiosInstance.post("register-user-token", data),
  registerUser: (data: Object) => axiosInstance.post("user/register", data),
  updateUser: ({ id, data }: any) =>
    axiosInstance.put(`users/${id}/update`, data),
  getRegisteredUser: ({ mobile }: any) =>
    axiosInstance.get(`userDetail?mobile=${mobile}&type=CUSTOMER`),
  deleteUser: ({ userId }: any) =>
    axiosInstance.put(`users/${userId}/status=DELETED`),
};

export const orderAPI = {
  getOrders: ({ month }) => axiosInstance.get(`collect/orders?month=${month}`),
  getOrdersWithId: ({ id }: any) => axiosInstance.get(`collect/orders/${id}`),
  getReturnWithId: ({ id }: any) => axiosInstance.get(`return/orders/${id}`),
  // getReturn: (status: string) =>
  //   axiosInstance.get(`return/orders${status ? `?status=${status}` : ""}`),
  getReturn: ({ status, month }) =>
    axiosInstance.get(
      status
        ? month
          ? `agent/orders/${status}?month=${month}`
          : `agent/orders/${status}`
        : month
        ? `return/orders?month=${month}`
        : `return/orders`
    ),
  // getPendingReturn: () => axiosInstance.get(`agent/orders/pending`),
  postOrders: (data: object) => axiosInstance.post(`order`, data),
  getCategory: () =>
    axiosInstance.get(`clients/${GLOBAL_CONSTANT.clientId}/categories`),
  getCategoryPrice: (categoryId: any) =>
    axiosInstance.get(`categories/${categoryId}/price`),
  getSubCategory: (catId: string) =>
    axiosInstance.get(`categories/${catId}/items`),
  getCategoryStock: (catid: string) =>
    axiosInstance.get(`stock?category=${catid}`),
  getProductions: ({ month }) =>
    axiosInstance.get(`productions?month=${month}`),
  postProduction: (data: Object) => axiosInstance.post("production", data),
  changeStatus: (data: Object) => axiosInstance.put("order/changeStatus", data),
};

export const notificationAPI = {
  getNotifications: ({ userId }: any) =>
    axiosInstance.get(`notifications/users/${userId}`),
  deleteNotificaion: ({ id }: any) =>
    axiosInstance.delete(`notifications/${id}`),
};

export const processAPI = {
  getProcesses: () => axiosInstance.get(`materialProcesses`),
};

export const analyticsAPI = {
  getAnalytics: () => axiosInstance.get("analytics"),
};

export const users = {
  getSMART_CENTRE: () => axiosInstance.get("franchise"),
};
