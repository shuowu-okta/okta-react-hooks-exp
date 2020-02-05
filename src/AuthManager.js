import { Auth } from '@okta/okta-react';

class AuthManager {
  static instance = undefined

  static getInstance() {
    if (AuthManager.instance === undefined) {
      AuthManager.instance = new Auth();
    }

    return AuthManager.instance;
  }

  static init(config) {
    AuthManager.instance = new Auth(config)
  }
}

export default AuthManager
