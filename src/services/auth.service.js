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
        console.log(response.headers);
        if (response.headers.get("Authorization")) {
          window.localStorage.setItem(
            "token",
            response.headers.get("Authorization")
          );
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(funcao, password, registration, role, username) {
    return axios.post(API_URL + "/api/v1/signup", {
      function: funcao,
      password: password,
      registration: registration,
      role: role,
      username: username,
    });
  }
  getCurrentUser() {
    return JSON.parse(window.localStorage.getItem("user"));
  }
}
export default new AuthService();
