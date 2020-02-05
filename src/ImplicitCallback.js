import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import useAuth from './useAuth';

// Rewrite ImplicitCallback to consume auth props from context
const ImplicitCallback = () => {
  const { authenticated, fromUrl, handleAuthentication } = useAuth();

  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication]);

  if (authenticated) {
    return <Redirect to={fromUrl} />;
  }

  return <p>Loading...</p>;
};


export default ImplicitCallback;
