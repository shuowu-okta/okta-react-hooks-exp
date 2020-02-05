import React from 'react'
import useAuth from '../../useAuth'

const LoginButton = () => {
  const { login } = useAuth()

  const handleLogin = () => {
    login('/')
  }

  return <button type="button" onClick={handleLogin}>LogIn</button>
}

export default LoginButton