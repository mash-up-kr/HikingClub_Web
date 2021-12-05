/* External dependencies */
import { isEmpty } from 'lodash';

const TOKEN = 'USER_TOKEN';

class AuthStorageService {
  token: string | null = null;

  getCookie(key: string) {
    const cookieParts = `; ${document.cookie}`.split(`; ${key}=`);
    if (cookieParts.length >= 2) {
      return cookieParts.pop()!.split(';').shift() ?? null;
    }
    return null;
  }

  getToken() {
    if (isEmpty(this.token)) {
      this.token = this.getCookie(TOKEN);
    }

    return this.token;
  }
}

export default new AuthStorageService();
