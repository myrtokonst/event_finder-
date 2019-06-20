import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react'
import { processScopedUiProps } from '@fullcalendar/core';

class GoogleMap extends Component{

    render() {
        const mapStyles = {
            width: '50%',
            height: '50%',
            position: 'absolute',
            marginTop: '1rem',
            left: '12rem'
          }
          const { location, google } = this.props
          const long = Number(location.longitude)
          const lat =  Number(location.latitude)
          return ( 
        <Map
          google={google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: lat, lng: long}}
          >
           <Marker position={{ lat: lat, lng:long}} />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_TOKEN
  })(GoogleMap);
