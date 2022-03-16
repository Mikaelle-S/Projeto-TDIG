import axios from "axios";
const API_URL = "https://fast-badlands-00990.herokuapp.com";
class AuthService {
  login(password, username) {
    return axios
      .post(API_URL + "/api/v1/login", {
        password: password,
        username: username,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) {
          window.location.reload();
        }
        console.log(err);
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(funcao, password, registration, role, username) {
    return axios
      .post(API_URL + "/api/v1/signup", {
        function: funcao,
        password: password,
        registration: registration,
        role: role,
        username: username,
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) {
          window.location.reload();
        }
        console.log(err);
      });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
