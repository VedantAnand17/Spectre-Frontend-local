import axios from "axios";

const api = axios.create({
  baseURL: "https://owasp.crestfallen.sbs/",
  withCredentials: true,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
