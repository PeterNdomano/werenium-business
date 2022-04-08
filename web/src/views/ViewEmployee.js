import React, { Component } from 'react';
import { MDBInput } from 'mdbreact';
import $ from 'jquery';
import { showLoader,
  hideLoader,
  getLoader,
  tellUser,
  validateNum,
  validateStr,
  numberFormat,
  thousandSeps,
} from '../Helper';

export default class ViewEmployee extends Component{

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>{this.props.item.fullname}</h2>
            <h5>{this.props.item.phone}</h5>
            <h5>{this.props.item.details}</h5>
          </div>

        </div>
      </div>
    );
  }
}
