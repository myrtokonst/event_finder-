//react
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

//components
import Search from '../components/Search'
import EventComponent from '../components/EventComponent'

//styling
import { MDBContainer, MDBRow, MDBCol, MDBNavbar, MDBNavbarNav, MDBNavItem,  MDBFormInline } from "mdbreact";


class EventsContainer extends Component {
    
    state = {
        cats: [],
        filteredEvents: null,
        searchEvents: null,
        events: [],
        myEvents: [],
        dateToggle: false
    }
    
    //fetching
    getEvents () {
        let token = localStorage.getItem('token')
           return  fetch('http://localhost:3000/your_events', {
            headers: {Authorization: token}})
           .then(resp => resp.json())
           .then(events => this.setState({events}))
        }
    
    postSearchResultsToServer (cat, day, location) {
        return fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: day,
                cat: cat,
                location: location==="All" ? [] : location})
            }).then(resp => resp.json())
        }

         
   
  
   

    //initial rendering
    componentDidMount() {
        this.getEvents()
         this.setState({cats: this.props.userCats})
         
    }

//event save 
 findEvent = (e, id) => {
    const { searchEvents, events } = this.state
    const selectedEvent = (!searchEvents ? events : searchEvents).find(e => e.id === id)
    e.stopPropagation()
    e.currentTarget.disabled = true
    this.props.saveEvent(selectedEvent)
 }
  
    //handling buttons and filters
    handleFilter  = (event) =>  {
        const { events } = this.state
        const filteredEvents = events.filter(e => event.target.value === "All" ? e : e.category_id === event.target.value)
        filteredEvents.length === events.length ? this.setState({filteredEvents: null}) : this.setState({ filteredEvents: filteredEvents})
    }
    //search
    handleSearch = ( cat, day, location) => {
    this.postSearchResultsToServer(cat, day, location)
        .then(searchEvents => this.setState({searchEvents}))
        .then(this.setState({filteredEvents: null}))
    }

    handleBack = () => this.setState({searchEvents: null })
    
    //sorting
    sorting = event => {
       const  { events } = this.state
       if (event.target.value === "Time") {
        let chronEvents = events.sort((a,b) => 
            new Date(a.start.local).getTime() - new Date(b.start.local).getTime())
            this.setState({events: chronEvents})
       } else if (event.target.value === "Name") {
           let alphEvents = events.sort((a,b) => {if(a.name.text < b.name.text) { return -1; }
           if(a.name.text > b.name.text) { return 1; }
           return 0})
           this.setState({events: alphEvents})}
       }
  
    //render
    render () {
        const { filteredEvents, searchEvents, events } = this.state
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
                        Sort: <select className="browser-default custom-select" style={{ width: "15rem", margin:"2rem"}} onChange={event => this.sorting(event)}>
                                <option value="None" selected disabled>No Sorting</option>
                                <option value="Time">Chronologically</option>
                                <option value="Name">Alphabetically</option>
                            </select>
                        </MDBFormInline>
                        </MDBNavbarNav>
                </MDBNavbar> 
                <Search allCats={this.props.allCats} handleBack={this.handleBack} handleSearch={this.handleSearch} />
                <MDBContainer>
                <MDBRow>
                    <Route exact path='/events' render={props => {
                        // debugger
                        let collection = events
                        if ((filteredEvents && filteredEvents.length< 1) || (searchEvents && searchEvents.length<1)) {  
                            return <h1 style={{marginLeft: "10rem"}}>No events found</h1> 
                        } else if (filteredEvents && filteredEvents.length>0){
                            collection = filteredEvents
                        } else if (searchEvents) {
                            collection = searchEvents
                        }
                        return  collection.map( event =>  
                            <MDBCol  key={1} style={{margin:"3rem"}}>
                                <EventComponent {...props} event = {event} key = {event.id} icon="star" saveEvent={this.findEvent}/>
                            </MDBCol>)
                        }}/>
                 </MDBRow>
                 </MDBContainer>
            </div>
        )
    }
}

export default EventsContainer

