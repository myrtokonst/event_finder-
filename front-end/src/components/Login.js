import React, { Component } from 'react'
import API from '../API'

import './Login.css'
import {  MDBBtn, MDBContainer, MDBCard, MDBInput, MDBCardHeader, MDBRow, MDBCol } from "mdbreact";

class Login extends Component {
    
    state = {
        user: {
            username: '',
            password: ''
        }
    }
   

    handleChange = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    logIn = (event) => {
        event.preventDefault()
        API.signin(this.state.user)
        .then(data => {
            if (data.error) {
                alert(`didn't work ${data.error}`)
            }
            else {
             this.props.signin(this.state.user.username)
             this.props.history.push('/categories')
             localStorage.setItem('token', data.token)
            }
        })
    }

    signup = (event) => {
        event.preventDefault()
        API.signup(this.state.user)
        .then(data => {
            if (data.error) {
                alert(`Sign up didn't work: ${data.error}`)
            }
            else {
             this.props.signin(this.state.user.username)
             this.props.history.push('/categories')
             localStorage.setItem('token', data.token)
            }
        })
    }

    render () {
        return <div>
        <h1 style={{marginTop:"2rem"}}>Welcome to Event Finder!</h1>
        <MDBRow style={{position:"absolute", left:"10rem", top:"10rem"}}>
        <MDBCol>
        <MDBContainer>
            <MDBCard border="dark" className="m-3" style={{width:"30rem", marginTop:"1rem"}}>
                <MDBCardHeader color="mdb-color lighten-2">Log In</MDBCardHeader>
                <form> 
                    <MDBInput type='text' label='username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <MDBInput type='password' label='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <MDBBtn flat outline color="mdb-color lighten-2" onClick={this.logIn}>Log In</MDBBtn>
                </form>
            </MDBCard>
        </MDBContainer>
        </MDBCol>

        <MDBCol>
        <MDBContainer>
            <MDBCard border="dark" className="m-3" style={{width:"30rem", marginTop:"1rem"}}>
                <MDBCardHeader color="mdb-color lighten-2">Sign Up</MDBCardHeader>
                <form> 
                    <MDBInput type='text' label='username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <MDBInput type='password' label='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <MDBBtn flat outline color="mdb-color lighten-2" onClick={this.signup}>Sign Up</MDBBtn>
                </form>
            </MDBCard>
        </MDBContainer>
        </MDBCol>
        </MDBRow>
        </div>
    }
}

export default Login