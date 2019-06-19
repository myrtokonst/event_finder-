import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar(props) {
 return (
    <ul className='nav'>
    <li><Link to='/'><h4 >Events</h4></Link></li> 
    <li><Link to='/categories'><p>{props.username && "Categories" }</p></Link></li>
    <li><Link to='/events'><p>{props.username && "Events" }</p></Link></li>
    <li><Link to='/signin' onClick={props.signout}><p>{props.username ? "Sign out" : "Sign in"}</p></Link></li>  
    <li style={{position: "absolute", right: "1rem" }}><Link to='/myevents'><p>{props.username &&  `${props.username}'s Events` }</p></Link></li>
    </ul>
    );
  }

export default NavBar