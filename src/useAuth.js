import { useEffect, useContext, useCallback } from 'react';
import { AuthContext, updateStatus, updateError } from './AuthProvider'
import AuthManager from './AuthManager'

export default () => {
  const [{ authenticated }, dispatch] = useContext(AuthContext);
  const auth = AuthManager.getInstance()

  useEffect(() => {
    const init = async () => {
      const authed = await auth.isAuthenticated();
      dispatch(updateStatus(authed));
    };

    init();
  }, [authenticated]);

  const login = (redirectUrl) => auth.login(redirectUrl);

  const logout = (redirectUrl) => auth.logout(redirectUrl);

  const handleAuthentication = useCallback(
    () => auth.handleAuthentication()
      .then(() => dispatch(updateStatus(true)))
      .catch((err) => dispatch(updateError(err))),
    []
  )

  const securedFetch = useCallback(
    async (url) => {
      const token = await auth.getAccessToken()

      if (!token) {
        return Promise.reject(new Error('Not authenticated'))
      }

      return fetch(
        url,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    },
    []
  );

  return {
    authenticated,
    fromUrl: auth.getFromUri(),
    login,
    logout,
    handleAuthentication,
    securedFetch,
  };
};
