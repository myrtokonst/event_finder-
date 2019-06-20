import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


import './main.scss' // webpack must be configured to do this
import {  MDBContainer } from 'mdbreact'

import PopUp from './PopUp'

export default class Calendar extends React.Component {
   state = {
       popover: false,
       event: ''
   }
   
    parseEvents () {
     let parsedEvents = []
        this.props.events.forEach(event => 
            parsedEvents.push({id: event.id, title: event.name.text, 
                    start: event.start.local}))
        return parsedEvents
    }

    showPopUp = e => {
        const thisEvent = this.props.events.find(event => event.id === e.event.id)
            this.setState({popover: !this.state.popover, event: thisEvent})
            
            // return this.sendEventToPopUp(e.event.id)
        }

    closePopUp = () => {
        this.setState({popover: !this.state.popover})
        }

    render() {
        const { popover, event } = this.state
        const { removeEvent } = this.props
        return (
            <div className="Calendar">
                {popover &&  <PopUp event={event} close={this.closePopUp} deleteEvent={removeEvent} />}
                <MDBContainer style={{height:'85vh'}}>
                    <h1 className="elegantshadow">Your Calendar</h1>
                    
                    <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin]}
                        eventColor='black' eventTextColor='white' displayEventTime={false} 
                        eventClick={(e) => this.showPopUp(e)}
                        height='parent' events={this.parseEvents()} />
                </MDBContainer>
            </div>
        )
      }
    }

//     <FrontSide>
//           <div className="polaroid">
//           <MDBBtn  size="sm" outline color="yellow" onClick={e => this.props.saveEvent(e,event.id)} style={{position:"absolute", right:"0rem", bottom:"0rem"}}>
//               <MDBIcon icon={this.props.icon} size="lg"/>
//             </MDBBtn>
//               <img src={event.logo ? event.logo.original.url : image} style={{width: '100%', height: '200px'}} />
//               <div className="container">
//                 <h4>{event.name.text}</h4>
//                 <p>{date.toDateString()}</p>
//              </div>
//              </div>
//     </FrontSide>
              
//     <BackSide>
//            <h3>{event.venue.name}</h3>
//             <p>{event.venue.address.localized_address_display}</p>
//             <p>{event.description ? event.description.text.slice(0,300) : "No description given"}</p>
//             <MDBBtn href={event.url}>Book Me!</MDBBtn>
//     </BackSide>
//   </Flippy>