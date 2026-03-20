import axios from "axios";

const base = "http://localhost:2000/api/";

const baseURL = axios.create({
  baseURL: base,
});

export default baseURL;
