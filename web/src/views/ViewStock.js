import React, { Component } from 'react';
import { MDBInput } from 'mdbreact';
import $ from 'jquery';
import { showLoader,
  hideLoader,
  getLoader,
  tellUser,
  validateNum,
  validateStr,
} from '../Helper';

export default class ViewStock extends Component{

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
            <h1>{this.props.item.title}</h1>
          </div>
        </div>
      </div>
    );
  }
}
