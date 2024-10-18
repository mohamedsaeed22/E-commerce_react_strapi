import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  get(name) {
    return cookies.get(name);
  }
  set(name, value, options) {
    cookies.set(name, value, options);
  }
  remove(name, options) {
    cookies.remove(name, options);
  }
}

export default new CookieService();
