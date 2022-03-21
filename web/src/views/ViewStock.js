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
} from '../Helper';

export default class ViewStock extends Component{

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>
              {this.props.item.quantity}
              <span style={{ fontSize:"14px" }}>
                &nbsp;&nbsp;
                {this.props.item.unit}
                {(this.props.item.quantity > 0) ? 's' : ''}
              </span>
            </h2>
            <h4 className="text-primary" style={{ fontFamily:"OpenSansRegular" }}>{this.props.item.title}</h4>
          </div>
          <div className="col-md-6">
            <h2>
              {numberFormat(this.props.item.bPrice)}
            </h2>
            <span style={{ fontSize:"14px" }}>
              Buying Price
            </span>
            <br/><br/><br/>
            <h2>
              {numberFormat(this.props.item.sPrice)}
            </h2>
            <span style={{ fontSize:"14px" }}>
              Selling Price
            </span>

          </div>
          <div className="col-md-12">
            <hr/>
            <p>No of Sales vs time graph</p>
          </div>
          <div className="col-md-12 text-right">
            <button onClick={() => { $('#dialogCloser2').click() }} className="btn btn-warning text-dark">Close</button>
          </div>
        </div>
      </div>
    );
  }
}
