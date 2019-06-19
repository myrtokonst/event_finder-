import React, { Component } from 'react'

import {  MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem  } from "mdbreact" 

class Search extends Component {
    state = {
        cat: '',
        day: '',
        location: ''
    }
    handleEvent = (event) => {
    this.setState({[event.target.name]: event.target.value})
    }

    render (){
        const { cat, day, location } = this.state
        return ( <MDBDropdown>
      <MDBDropdownToggle caret color="dark" text="white" style={{ width: "65rem", marginTop: "1rem" }}>
        Advanced Search:
      </MDBDropdownToggle>
      <MDBDropdownMenu basic style={{ width: "65rem"}}>
      
        <h5 style={{position: "relative", left:"2rem"}}>Category:</h5>
        <select className="browser-default custom-select" name="cat" onChange={this.handleEvent} style={{ width: "60rem", position: "relative", left:"2rem"}}>
            <option value="All">All</option>
            {this.props.allCats.map(cat => <option  key={cat.id} value={cat.id}>{cat.name}
            </option>)}
        </select>
        
       <h5 style={{position: "relative", left:"2rem"}}>Date:</h5>
        <select className="browser-default custom-select" name="day" onChange={this.handleEvent}  style={{ width: "60rem", position: "relative", left:"2rem"}}>
            <option value="this_week">This week</option>
            <option value="next_week">Next week</option>
             <option value="this_weekend">This weekend</option>
             <option value="next_month">Next month</option>
             <option value="this_month">This month</option>
             <option value="tomorrow">Tomorrow</option>
             <option value="today">Today</option>
         </select>

         <h5 style={{position: "relative", left:"2rem"}}>Location:</h5>
        <select className="browser-default custom-select" name="location" onChange={this.handleEvent}  style={{ width: "60rem", position: "relative", left:"2rem"}}>
             <option value="All">Anywhere</option>
            <option value="W">West London</option>
            <option value="E">East London</option>
             <option value="S">South London</option>
             <option value="N">North London</option>
  
         </select>
         
         <br />
       <MDBDropdownItem>
        <MDBBtn flat outline color="mdb-color lighten-2" size="sm" onClick={() => this.props.handleSearch(cat, day, location)}>Search!</MDBBtn>
        <MDBBtn flat outline color="mdb-color lighten-2" size="sm" onClick={() => this.props.handleBack()}>Back to Recommended </MDBBtn>
       </MDBDropdownItem>
     </MDBDropdownMenu>
    </MDBDropdown>
    )}
}

export default Search