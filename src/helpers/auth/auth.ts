import { Auth } from "services/Auth";

export function isAuth() {
  return Auth.isAuth();
}

export function auth() {
  return Auth.getUser();
}

export function logout() {
  return Auth.localLogout();
}

export function can(permission: string) {
  return Auth.can(permission);
}
