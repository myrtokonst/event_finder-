import React, { Component } from "react";
// import { Route, Switch } from 'react-router-dom'

import UnpickedCategoriesContainer from "./UnpickedCategoriesContainer";
import MyCategoriesContainer from "./MyCategoriesContainer";

import { MDBContainer, MDBBtn } from "mdbreact";

class AllCategoriesContainer extends Component {
  componentDidMount = () => {
    if (!this.props.username) {
      this.props.history.push("/");
    }
    // this.getCats()
  };

  handleClick = () => {
    this.props.history.push("/events");
  };

  unpickedCats() {
    const { myCats, allCats } = this.props
    return allCats.filter(cat => !myCats.some(ct => ct.id === cat.id))
  }

  render() {
    const { myCats, allCats } = this.props;
    return (
      <div className="Cats">
      <h1 className="elegantshadow" style={{padding:'1rem'}}>Click on the categories to edit them:</h1>
      <MDBContainer>
        <MyCategoriesContainer
          cats={myCats}
          deleteCat={this.props.deleteCat}
        />
        <UnpickedCategoriesContainer
          selectCat={this.props.selectCat}
          cats={ allCats}
          unpickedCats = {this.unpickedCats()}
        />
        </MDBContainer>
        <MDBBtn flat outline color="mdb-color lighten-2"  onClick={e => this.props.saveCats(e, myCats)}>Save Changes</MDBBtn>
        <MDBBtn flat outline color="mdb-color lighten-2" onClick={this.handleClick}>Show me events</MDBBtn>
      </div>
    );
  }
}

export default AllCategoriesContainer;
