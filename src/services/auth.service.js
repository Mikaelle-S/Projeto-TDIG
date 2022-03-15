import axios from "axios";
const API_URL = "https://fast-badlands-00990.herokuapp.com";
class AuthService {
  login(req) {
    return axios
      .post(API_URL + "/api/v1/login", {
        req,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(req) {
    return axios.post(API_URL + "/api/v1/signup", {
      req,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
