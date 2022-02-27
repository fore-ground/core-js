import CryptoJS from "crypto-js";

export default class SecureStorage {
  static key: string = "this is the key what encrypt content";

  static setItem(name: string, value: string) {
    localStorage.setItem(
      name,
      this.encrypt(typeof value === "object" ? JSON.stringify(value) : value)
    );
  }

  static getItem(name: string): any {
    let value: any = localStorage.getItem(name);

    try {
      value = value != null ? this.decrypt(value) : value;
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  static encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.key).toString();
  }

  static decrypt(encrypted: string): string {
    return CryptoJS.AES.decrypt(encrypted, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }
}
