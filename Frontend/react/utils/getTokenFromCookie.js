// utils/getTokenFromCookie.js
export function getTokenFromCookie(name = "token") {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(row => row.startsWith(name + "="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}
