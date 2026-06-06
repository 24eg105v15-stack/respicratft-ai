import axios from "axios";

const API = axios.create({
  baseURL: "https://recipecraft-backend.onrender.com",
});

export default API;