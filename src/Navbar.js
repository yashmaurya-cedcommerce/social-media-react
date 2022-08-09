import React from 'react'
import { Link } from 'react-router-dom';


export default function Navbar(props) {
  return (
    <div className='navbarContainer py-3'>

      <div className='logoDiv'>

      <Link to={{pathname: "/home"}} className="navLink">
        <i class="fa-solid fa-users"></i>Social.ly
      </Link>

      </div>

      <div className='feedHeading'>

      {(Object.keys(props.loginFlag).length == 0)?"":<p>Welcome, {props.loginFlag.name} <i class="fa-solid fa-user-check"></i></p>}

      </div>

      <div className='mainNav'>

      <Link to={{pathname: "/aboutus"}} className="navLink" id="aboutUsLink">
        About Us
      </Link>

      {(Object.keys(props.loginFlag).length == 0)? "" :<button id="signOutLink" onClick={()=>{if(window.confirm('Are you sure you want to sign out?')){props.signOutClicked()};}}>Sign Out</button>}

      </div>

    </div>
  )
}
