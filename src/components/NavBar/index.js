import React from 'react'
import LoginButton from '../LoginButton'
import LogoutButton from '../LogoutButton'
import useAuth from '../../useAuth'

const NavBar = () => {
  const { authenticated } = useAuth()

  return (
    <div>
      <span>Nav bar</span>
      {authenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  )
}

export default NavBar