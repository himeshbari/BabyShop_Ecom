import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer bottom-0 w-100 z-3' style={{zIndex:"10 !important"}}>
    <h1 className="text-center">All Right Reserved &copy; HIMU</h1>
    <p className="text-center mt-3">
        <Link to="/about">About</Link>|
        <Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer