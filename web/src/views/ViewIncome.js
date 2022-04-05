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

export default class ViewIncome extends Component{

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>{thousandSeps(this.props.item.amountPaid)} <span>{this.props.business.info.currency}</span></h2>
            <h5>{this.props.item.ref}</h5>
          </div>

        </div>
      </div>
    );
  }
}
