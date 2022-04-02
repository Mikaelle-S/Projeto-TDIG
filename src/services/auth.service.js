import authHeader from "./auth-header";
import axios from "axios";
const API_URL = "https://immense-sands-97611.herokuapp.com";

class AuthService {
  login(password, username) {
    return axios
      .post(API_URL + "/api/v1/login", {
        password: password,
        username: username,
      })
      .then((response) => {
        console.log(response.data.token);
        if (response) {
          localStorage.setItem("token", response.data.token);
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

  createProject(name, description) {
    return axios.post(
      API_URL + "/api/v1/projects",
      {
        description: description,
        name: name,
      },
      {
        headers: authHeader(),
      }
    );
  }

  linkUser(funcao, projectId, username) {
    return axios.post(
      API_URL + "/api/v1/projects/link",
      {
        function: funcao,
        projectId: projectId,
        username: username,
      },
      {
        headers: authHeader(),
      }
    );
  }

  getCurrentUser() {
    return JSON.parse(window.localStorage.getItem("user"));
  }
}
export default new AuthService();
