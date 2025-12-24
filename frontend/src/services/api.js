import axios from "axios";
import { toast } from "react-hot-toast";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// ✅ REQUEST INTERCEPTOR (TOKEN ATTACH)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR (ERROR TOAST)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
    return Promise.reject(error);
  }
);

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);

// MOVIES
export const getMovies = () => API.get("/movies");
export const searchMovies = (q) => API.get(`/movies/search?q=${q}`);
export const sortMovies = (by) => API.get(`/movies/sorted?by=${by}`);
export const addMovie = (data) => API.post("/movies", data);
export const updateMovie = (id, data) =>
  API.put(`/movies/${id}`, data);
export const deleteMovie = (id) =>
  API.delete(`/movies/${id}`);
export const loadIMDbMovies = () =>
  API.post("/movies/load-imdb");

export default API;
