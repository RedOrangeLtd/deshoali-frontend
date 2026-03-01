import axios from "axios"
import apiUrl from "@/constants/apiUrl.js";

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': 'application/json',
  }
})
export default apiClient;
