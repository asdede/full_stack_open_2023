import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification){
    return (
      <div className='notification'>
        <h4>{notification}</h4>
      </div>
    )}
}

export default Notification
