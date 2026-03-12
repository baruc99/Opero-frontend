import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function isTokenValid(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}

export function shouldRefreshToken(token: string) {
  const decoded: any = jwtDecode(token);

  const exp = decoded.exp * 1000;
  const now = Date.now();

  const fiveMinutes = 5 * 60 * 1000;

  return exp - now < fiveMinutes;
}
