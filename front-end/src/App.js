//react
import React, { Component } from 'react'
import {  Route, Switch,  withRouter} from 'react-router-dom'

import { MDBRow, MDBCol, MDBContainer } from 'mdbreact'

//styling
import './App.css'

//components
import NavBar from './components/NavBar'
import Login from './components/Login'
import AllCategoriesContainer from './containers/AllCategoriesContainer'
import EventsContainer from './containers/EventsContainer'
import Landing from './containers/Landing'
import Calendar from './components/Calendar'


import API from './API'

console.log(process.env)
class App extends Component {
  state = {
    username: '',
    myCats: [],
    allCats: [], 
    myEvents: []
  }

  //fetch requests
  getUserCats() {
    let token = localStorage.getItem('token')
    return fetch('http://localhost:3000/usecats', {
        headers: {
          Authorization: token
        }
      })
      .then(resp => resp.json())
      .then(myCats => this.setState({myCats}))

  }

  getCats() {
    return fetch('http://localhost:3000/categories')
      .then(resp => resp.json())
      .then(allCats => this.setState({allCats}))
  }

  saveCatsOnServer (cats) {
    let token = localStorage.getItem('token')
    return fetch('http://localhost:3000/usecats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          categories: cats
        })
      }).then(resp => resp.json())
    }

    deleteCatFromServer = (id) => {
      const user_id = localStorage.getItem('token')
      return  fetch('http://localhost:3000/usecats', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user_id
        },
        body: JSON.stringify({cat_id: id})
      }).then(resp => resp.json())
    }

        
    fetchMyEventsFromServer = () => {
      const token = localStorage.getItem('token')
      return fetch('http://localhost:3000/bookings', {
        headers: {
          Authorization: token
        }
      })
      .then(resp => resp.json())
     
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
      })
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
    }

    //initial rendering
  componentDidMount() {
    API.validate()
      .then(data => {
        if (data.error) {
          this.props.history.push('/')
        } else {
          this.signin(data.username)
          this.getUserCats()
          this.getCats()
          this.getMyEvents()
            // .then(this.props.history.push('/categories'))
            //check how to do a turnary to see if it's on the log in page
        }
      })
  }

  //current user-related methods
  signin = username => {
    this.setState({
      username
    })
    // API.signin(username).then(
      this.getAllInfo()
      // )
  }

  getAllInfo () {
    this.getUserCats()
    this.getCats()
    this.getMyEvents()
    // debugger
  }

  signout = () => {
    this.setState({
      username: '',
      myCats: [],
      myEvents: []
    })
    localStorage.removeItem('token')
  }

  //Category CRUD
  saveCats = (e, cats) => this.saveCatsOnServer(cats)
    .then(() => this.setState({ myCats: cats }))
   
  

  selectCat = id => {
    const { allCats, myCats } = this.state
    const selectedCat = allCats.filter(cat => cat.id === id)[0]

     !myCats.map(cat => cat.id).includes(selectedCat.id) 
    // ? alert("Already Picked, just a buggy bug chilling")
    && this.setState({ myCats: [...myCats, selectedCat]}) 
  }

  deleteCat = (id) => {
    const {myCats } = this.state;
    const stillSelectedCats = myCats.filter(cat => cat.id !== id)
    this.setState({
      myCats: stillSelectedCats
    })
    this.deleteCatFromServer(id)
  }
  
 //events

 getMyEvents = () =>  this.fetchMyEventsFromServer().then(myEvents => this.setState({myEvents}))
 
 removeEvent = (id) => {
  const {myEvents} = this.state
  const remainingEvents = myEvents.filter(e => e.id !== id)
  this.setState({myEvents: remainingEvents})
  this.removeEventFromServer(id)
}


saveEvent = (selectedEvent) => {
  !this.state.myCats.includes(selectedEvent.id)
  && this.setState({myEvents: [...this.state.myEvents, selectedEvent]})
  this.saveEventToServer(selectedEvent.id)
 }
  

  //render
  render() {
    
  const { username, myCats, allCats, myEvents } = this.state
  return <div className = "App"  >
  
   <NavBar username = {username} signout = {this.signout}/> 
      
   <Switch >
      <Route exact path = '/' render = { props =>
          <Landing { ...props} />
      }/>

      <Route exact path = '/signin' render = { props => 
          <Login {...props } signin = {this.signin}/>} />

      <Route exact path = '/categories' render = {props => 
          <AllCategoriesContainer {...props } saveCats = {this.saveCats} 
              selectCat = {this.selectCat} deleteCat={this.deleteCat} 
              allCats = { allCats} myCats = { myCats } username = {username}/>} />

      <Route exact path = '/events' render = {props => 
          <EventsContainer { ...props }  allCats={allCats} 
              userCats = { myCats}  saveEvent={this.saveEvent} />} />
      <MDBRow>
      <Route exact path='/myevents' render = { props => 
       <MDBContainer>
         <Calendar {...props} events={myEvents} removeEvent={this.removeEvent} />
       </MDBContainer>
       
        // myEvents.map(event => 
        //   <MDBCol style={{margin:"3rem"}}>
        //     <EventComponent {...props} event = {event} key = {event.id} icon="trash-alt" saveEvent={this.removeEvent}/>
        //   </MDBCol>
         // )
      } />
      </MDBRow>
    </Switch>  
 </div>
}
}


export default withRouter(App)