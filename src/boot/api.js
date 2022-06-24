import axios from "axios";

const api = axios.create({
  baseURL: "http://laravel_sanctum_api.test:8080/api",
});

export default api;
