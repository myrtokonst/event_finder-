import React from 'react'


import { MDBMask, MDBRow, MDBCol,  MDBBtn, MDBView, MDBContainer } from "mdbreact";
    import "./Landing.css";

function Landing (props) {
   const  handleClick = () => {
       props.history.push("/categories")
      }
        return (
        <div id="videobackground">
        
          <MDBView>
            <video className="video-intro" poster="https://mdbootstrap.com/img/Photos/Others/background.jpg" playsInline
              autoPlay muted="" loop >
              <source src="https://mdbootstrap.com/img/video/animation.mp4" type="video/mp4"  />
            </video>
            <MDBMask className="d-flex justify-content-center align-items-center gradient">
              <MDBContainer className="px-md-3 px-sm-0">
                <MDBRow>
                  <MDBCol md="12" className="mb-4 white-text text-center">
                    <h3 className="display-3 font-weight-bold mb-0 pt-md-5">
                      Welcome to Events{" "}
                    </h3>
                    <hr className="hr-light my-4 w-75" />
                    <h4 className="subtext-header mt-2 mb-4">
                      Click the button below to begin!
                    </h4>
                    <MDBBtn outline rounded color="white" onClick={() => handleClick()} >
                       Pick your categories
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        
        </div>
        )}

export default Landing