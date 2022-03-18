import React, { Component } from 'react';
import { MdMenu } from 'react-icons/md';

export default class TopBar extends Component{

  render(){
    return (
      <div className="TopBar z-depth-1">
        <div className="container d-flex">
          <div style={{ cursor: "pointer" }} className="align-self-center p-2" onClick={this.props.toggleNavCallback}>
            <MdMenu size={30}/>
          </div>
          <div className="align-self-center p-2">
            <p className="title">Werenium Business</p>
          </div>
        </div>
      </div>
    );
  }
}
