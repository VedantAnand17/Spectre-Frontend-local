import axios from "axios";

const api = axios.create({
  baseURL: "https://owasp-ctf-registration-portal-ba-production.up.railway.app",
  withCredentials: true,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
