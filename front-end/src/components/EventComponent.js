import React, { Component } from 'react'

import Flippy, { FrontSide, BackSide } from 'react-flippy'
import { MDBBtn, MDBIcon } from 'mdbreact'
import image from '../avatar.png'
// import './EventComponent.css'

class EventComponent extends Component {
   
   
    render() { 
    const  { event } = this.props 
    const date = new Date(event.start.local)
        return (
             <Flippy
    flipOnHover={false} 
    flipOnClick={true} 
    flipDirection="horizontal" 
    ref={(r) => this.flippy = r} 
    style={{ width: '400px', height: '350px', backgroundColor: "white" }} 
  >
    <FrontSide>
          <div className="polaroid">
          <MDBBtn  size="sm" outline color="yellow" onClick={e => this.props.saveEvent(e,event.id)} style={{position:"absolute", right:"0rem", bottom:"0rem"}}>
              <MDBIcon icon={this.props.icon} size="lg"/>
            </MDBBtn>
              <img src={event.logo ? event.logo.original.url : image} alt="image" style={{width: '100%', height: '200px'}} />
              <div className="container">
                <h4>{event.name.text}</h4>
                <p>{date.toDateString()}</p>
             </div>
             </div>
    </FrontSide>
              
    <BackSide>
           <h3>{event.venue.name}</h3>
            <p>{event.venue.address.localized_address_display}</p>
            <p>{event.description ? event.description.text.slice(0,300) : "No description given"}</p>
            <MDBBtn href={event.url}>Book Me!</MDBBtn>
    </BackSide>
  </Flippy>
    )
}}

export default EventComponent