import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/v1/services", // This will go through the proxy
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getServices() {
    return apiClient.get("/");
  },
  getService(id) {
    return apiClient.get(`/${id}`);
  },
  createService(service) {
    return apiClient.post("/", service);
  },
  updateService(id, service) {
    return apiClient.put(`/${id}`, service);
  },
  deleteService(id) {
    return apiClient.delete(`/${id}`);
  },
};
