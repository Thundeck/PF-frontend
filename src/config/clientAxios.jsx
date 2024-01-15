import axios from "axios";

const baseURL = "http://localhost:3001" || process.env.BACKEND_URL;

const clientAxios = axios.create({
  baseURL,
});

export default clientAxios;
