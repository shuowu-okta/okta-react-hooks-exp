import React, { createContext, useReducer } from 'react'
import AuthManager from './AuthManager'

export const AuthContext = createContext();

const UPDATE_STATUS = 'UPDATE_STATUS'
const UPDATE_ERROR = 'UPDATE_ERROR'

export const updateStatus = (payload) => ({ type: UPDATE_STATUS, payload })

export const updateError = payload => ({ type: UPDATE_ERROR, payload })

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return {
        ...state,
        authenticated: action.payload,
      };

    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state;
  }
};

const AuthProvider = ({ config, children }) => {
  AuthManager.init(config);

  return (
    <AuthContext.Provider value={useReducer(reducer, { authenticated: false, error: '' })}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider