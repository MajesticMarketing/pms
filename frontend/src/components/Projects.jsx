import React from 'react'
import { Link } from 'react-router-dom'

export default function Projects() {
  return (
    <div>
      <p>This is a Projects page</p>
      <Link to="/" className='underline'>go to dashboard</Link>
    </div>
  )
}
