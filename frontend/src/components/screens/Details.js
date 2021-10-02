import React, { Component } from 'react';

import { GoogleComponent } from 'react-google-location'
 
 
 
const API_KEY = "AIzaSyB3_fL9jxNqiLpN1F0GZjrsMuBeShXbwYE" ; // how to get key - step are below
 
class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null,
    };
  }
 
  render() {
    return (
      <div >
         <GoogleComponent
         
          apiKey={API_KEY}
          language={'en'}
          country={'country:in|country:us'}
          coordinates={true}
          locationBoxStyle={'custom-style'}
          locationListStyle={'custom-style-list'}
          onChange={(e) => { this.setState({ place: e }) }} />
      </div>
 
    )
  } 
}
 
 
export default HomeComponent;