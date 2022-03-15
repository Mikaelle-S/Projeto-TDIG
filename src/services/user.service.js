import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://fast-badlands-00990.herokuapp.com";
class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }
  getUserBoard() {
    return axios.get(API_URL + "/api/v1/projects", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "/api/v1/projects", { headers: authHeader() });
  }
}
export default new UserService();
