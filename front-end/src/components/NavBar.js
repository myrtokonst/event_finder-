import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar(props) {
 return (
    <ul className='nav'>
    <li><h4>Event Finder</h4></li> 
    <li><Link to='/categories'><p>{props.username && "Categories" }</p></Link></li>
    <li><Link to='/events'><p>{props.username && "Events" }</p></Link></li>
    <li><Link to='/' onClick={props.signout}><p>{props.username ? "Sign out" : "Sign in"}</p></Link></li>  
    <li style={{position: "absolute", right: "1rem" }}><Link to='/myevents'><p>{props.username && "My Events" }</p></Link></li>
    </ul>
    );
  }

export default NavBar