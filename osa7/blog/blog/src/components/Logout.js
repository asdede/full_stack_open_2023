import React from 'react'

const LogOut = ({ username, handleLogout }) => {
  return (
    <div className="logout">
      <h4>
        Logged in as: {username} <button onClick={handleLogout}>Log out</button>{' '}
      </h4>
    </div>
  )
}

export default LogOut
