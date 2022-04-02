export default function authHeader() {
  const token = localStorage.getItem("token");

  if (token) {
    console.log(token);
    return { Authorization: token };
  } else {
    return {};
  }
}
