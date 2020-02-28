import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './AuthProvider';
import { domain, clientId } from './config';

// This is a test commit - test branch

const config = {
  issuer: `https://${domain}/oauth2/default`,
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId,
  pkce: true,
  postLogoutRedirectUri: 'http://localhost:3000/'
};

ReactDOM.render(
  <AuthProvider config={config}>
    <App />
  </AuthProvider>,
  document.getElementById('root'),
);
