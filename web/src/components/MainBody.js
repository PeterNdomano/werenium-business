import React, { Component } from 'react';
import { getLoader } from '../Helper';

export default class MainBody extends Component{
  render(){
    return (
      <div className="MainBody">
        <div className="container">
          <h4>Come here</h4>
          {getLoader()}
        </div>
      </div>
    );
  }
}
