import axios from "axios";

const instance = axios.create({
  baseURL: "https://3fb64dddd6ea.ngrok-free.app/api",
  withCredentials: true,
});

export default instance;
