/**
 * Sets up title text with description to App.js
 */
import React from 'react'

const title = 'Awesome blogs'

const description = 'Post your favorite blog and vote existing blogs'

const Title = () => {
  console.log('Setting title...')
  return (
    <ul className="titlebox">
      <h2>{title}</h2>
      <p className="description">{description}</p>
    </ul>
  )
}

export default Title
