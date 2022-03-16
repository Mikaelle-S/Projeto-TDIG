export default function authHeader() {
  const token = window.localStorage.getItem("token");
  if (token) {
    return { Authorization: token };
  } else {
    return null;
  }
}
