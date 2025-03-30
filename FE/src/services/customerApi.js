import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/v1/customers",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Fetch a customer by ID
  getCustomer(id) {
    return apiClient.get(`/${id}`);
  },

  // Fetch all customers with optional query parameters (pagination, filtering)
  //   getCustomers(params) {
  //     return apiClient.get("/", { params });
  //   },

  getCustomers() {
    return apiClient.get("/"); 
  },

  // Create a new customer
  createCustomer(customer) {
    return apiClient.post("/", customer);
  },

  // Update an existing customer
  updateCustomer(id, customer) {
    return apiClient.put(`/${id}`, customer);
  },

  // Delete a customer by ID
  deleteCustomer(id) {
    return apiClient.delete(`/${id}`);
  },
};
