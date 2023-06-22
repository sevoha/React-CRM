import axios from "axios"
import Customer from "../interfaces/customer";

let api : string = "http://localhost:8000/customers"

// GET for all customers
export function getCustomers() {
    return axios.get(api);
}

// GET for specific customer by id
export function getCustomerById(id: number) {
    return axios.get(`${api}/${id}`);
}

// POST new customer
export function addCustomer(newCustomer: Customer) {
    return axios.post(api, newCustomer);
}

// PUT specific customer by id
export function updateCustomer(id: number, updatedCustomer: Customer) {
    return axios.put(`${api}/${id}`, updatedCustomer);
}

// DELETE customer by id
export function deleteCustomer(id: number) {
    return axios.delete(`${api}/${id}`);
}