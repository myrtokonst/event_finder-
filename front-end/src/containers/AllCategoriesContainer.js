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
    const { myCats } = this.props;
    // debugger
    return this.props.allCats.filter(cat => !myCats.includes(cat));
  }

  render() {
    const { myCats, allCats } = this.props;
    return (
      <div>
      <h1>Edit your Categories!</h1>
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
