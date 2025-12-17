import axios from "axios";

const baseURL = "http://localhost:5000/api";

const http = axios.create({
  baseURL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const msg = String(data?.message || data?.error || "");

    if (status === 403 && /account blocked/i.test(msg)) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("token");
      } catch {
        // ignore
      }

      if (typeof window !== "undefined") {
        const here = window.location?.pathname || "";
        if (!here.startsWith("/login")) {
          window.location.href =
            "/login?msg=" + encodeURIComponent("Account blocked");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default http;
