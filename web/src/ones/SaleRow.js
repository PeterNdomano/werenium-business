import React, { Component } from 'react';

export default class SaleRow extends Component{
  render(){
    return (
      <div className="row SaleRow z-depth-1">
        <div className="col-md-2">
          <input className="form-control" placeholder="Particular" type="text"/>
        </div>
        <div className="col-md-2">
          <select className="form-control" placeholder="Type" type="text">
            <option value="Service">Service</option>
            <option value="Product">Product</option>
          </select>
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="Quantity" type="text"/>
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="Unit" type="text"/>
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="Unit Price" type="text"/>
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="Sub Total" type="text"/>
        </div>
      </div>
    );
  }
}
