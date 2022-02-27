export class Auth {
  static attempt(email: string, password: string) {}

  /**
   * Recupere le token
   *
   * @returns {string}
   */
  static getToken() {
    return localStorage.getItem("token");
  }

  /**
   * Rêcupère l'utilisateur connecté
   *
   * @returns {{id: number, uuid: string, email: string, name: string}} | null
   */
  static getUser() {
    const payload = localStorage.getItem("user");
    return payload ? JSON.parse(payload) : null;
  }

  /**
   * Enregistre le token
   *
   * @param {string} token
   */
  static setToken(token: string) {
    localStorage.setItem("token", token);
  }

  /**
   * Permet de sauvegarder l'utilisateur authentifié
   *
   * @param {{id: number, uuid: string, email: string, name: string}} payload
   */
  static setAuth(auth: any) {
    localStorage.setItem("user", JSON.stringify(auth));
  }

  /**
   * Permet de supprimé le token
   *
   * @returns {void}
   */
  static removeToken() {
    localStorage.removeItem("token");
  }

  /**
   * Supprime l'utilisateur connecté
   *
   * @returns {void}
   */
  static removeUser() {
    localStorage.removeItem("user");
  }

  /**
   * Determine si un utilisateur est authentifié
   *
   * @returns {boolean}
   */
  static isAuth() {
    return null != Auth.getToken();
  }

  /**
   * Determine si l'utilisateur possede un epermission
   *
   * @param {string} permission
   */
  static can(permission: string) {
    // return window.$permissions.indexOf(permission) !== -1;
  }

  /**
   * Nettoie tous les informations liee a l'auth
   */
  static localLogout() {
    Auth.removeToken();
    Auth.removeUser();
  }
}
