import React from 'react'
import './PopUp.css'
import { MDBContainer, MDBCloseIcon, MDBBtn } from 'mdbreact'
import GoogleMap from './GoogleApiWrapper'


class PopUp extends React.Component {  
 
  deleteEverything = (id) => {
    const { close, deleteEvent } = this.props
    deleteEvent(id)
    close()
  }
 
  render() { 
    const { event, close } = this.props
return (  
    <MDBContainer>
      <div className='popup'>  
        <div className='popup_inner'>  
        <MDBCloseIcon onClick={() => close()} style={{position:"absolute", right:"6px"}}/>   
          <h4>{event.name.text}</h4> 
          <p>{event.venue.address.localized_address_display}</p>
          <a href={event.url}>More info</a>
          <GoogleMap location={event.venue.address} />
          <MDBBtn flat style={{position:"absolute", bottom: "1rem", left:"15rem"}} size="sm" onClick={() => this.deleteEverything(event.id)} >Remove Event from calendar</MDBBtn>
        </div>  
       </div>  
    </MDBContainer>)}}  

export default PopUp

