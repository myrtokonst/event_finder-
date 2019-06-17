//react
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

//components
import Search from '../components/Search'
import EventComponent from '../components/EventComponent'

//styling
import { MDBContainer, MDBRow, MDBCol, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBInput, MDBFormInline } from "mdbreact";


class EventsContainer extends Component {
    
    state = {
        cats: [],
        filteredEvents: null,
        searchEvents: null,
        events: [],
        myEvents: []
    }
    
    //fetching
    getEvents () {
        let token = localStorage.getItem('token')
           return  fetch('http://localhost:3000/your_events', {
            headers: {Authorization: token}})
           .then(resp => resp.json())
           .then(events => this.setState({events}))
        }
    
    postSearchResultsToServer (cat, day) {
        return fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: day,
                cat: cat})
            }).then(resp => resp.json())
        }

         
    saveEventToServer = (id) => {
        const user_id = localStorage.getItem('token')
        return  fetch('http://localhost:3000/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user_id
          },
          body: JSON.stringify({event_id: id})
        }).then(resp => resp.json())
        // .then(btn.setAttribute("disabled", "disabled")) DISABLE BUTTON
      }
  
      removeEventFromServer = (id) => {
        const user_id = localStorage.getItem('token')
        return  fetch('http://localhost:3000/bookings', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user_id
          },
          body: JSON.stringify({event_id: id})
        }).then(resp => resp.json())
      }

   

    //initial rendering
    componentDidMount() {
        this.getEvents()
         this.setState({cats: this.props.userCats})
         
    }

//event CRUD 

 saveEvent = (e, id) => {
 const selectedEvent = this.state.events.find(e => e.id === id)

 e.stopPropagation()
 e.currentTarget.disabled = true
 this.setState({myEvents: [...this.state.myEvents, selectedEvent]})
 this.saveEventToServer(id)
}
  
 removeEvent = (id) => {
   const {myEvents} = this.state
   const remainingEvents = myEvents.filter(e => e.id !== id)
   this.setState({myEvents: remainingEvents})
  
   this.removeEventFromServer(id)
 }


    
  
    //handling buttons and filters
    handleFilter  = (event) =>  {
        const { events } = this.state
        const filteredEvents = events.filter(e => event.target.value === "All" ? e : e.category_id === event.target.value)
        filteredEvents.length === events.length ? this.setState({filteredEvents: null}) : this.setState({ filteredEvents: filteredEvents})
    }
    //search
    handleSearch = (cat, day) => this.postSearchResultsToServer(cat, day)
        .then(searchEvents => this.setState({searchEvents}))
        .then(this.setState({filteredEvents: null}))

    handleBack = () => this.setState({searchEvents: null })
    
    //render
    render () {
        const { filteredEvents, searchEvents, events, myEvents } = this.state
        return (
            <div>
                <MDBNavbar color="mdb-color lighten-2" dark className="white-text" expand="md" style={{height:"5rem"}}>
                        <MDBNavbarNav left>
                        <MDBFormInline>
                        <MDBNavItem active>
                            Filter:
                            <select className="browser-default custom-select" style={{ width: "15rem", margin:"2rem"}} onChange={event => this.handleFilter(event)}>
                                <option value="All">All</option>
                                {this.state.cats.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                        </MDBNavItem>
                        Sort by Date? <MDBInput type="checkbox" id="checkbox"  />
                        </MDBFormInline>
                        </MDBNavbarNav>
                </MDBNavbar> 
                <Search allCats={this.props.allCats} handleBack={this.handleBack} handleMadness={this.handleSearch} />
                <MDBContainer>
                <MDBRow>
                    <Route exact path='/events' render={props => {
                        let collection = events
                        if ((filteredEvents && filteredEvents.length< 1) || (searchEvents && searchEvents.length<1)) {  
                            return <h1 style={{marginLeft: "10rem"}}>No events found</h1> 
                        } else if (filteredEvents && filteredEvents.length>0){
                            collection = filteredEvents
                        } else if (searchEvents) {
                            collection = searchEvents
                        }
                        return  collection.map( event =>  
                            <MDBCol style={{margin:"3rem"}}>
                                <EventComponent {...props} event = {event} key = {event.id} saveEvent={this.saveEvent}/>
                            </MDBCol>)
                        }}/>
                 </MDBRow>
                 </MDBContainer>
            </div>
        )
    }
}

export default EventsContainer

