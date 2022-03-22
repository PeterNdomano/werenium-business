import React, { Component } from 'react';
import { tellUser } from '../Helper';

export default class SaleRow extends Component{
  constructor(props){
    super(props);
    this.state = {
      unitPrice: "",
      subTotal: "",
      quantity: "",
    }
  }

  handleQuantity = (quantity) => {
    if(quantity.trim().length > 0 && !isNaN(quantity)){
      let subTotal = quantity * this.state.unitPrice;

      this.setState({
        subTotal, quantity
      })
    }
    else{
      tellUser('Quantity should be a number');
      this.setState({
        subTotal: '',
        quantity: '',
      })
    }

  }

  handleUnitPrice = (unitPrice) => {
    if(unitPrice.trim().length > 0 && !isNaN(unitPrice)){
      let subTotal = unitPrice * this.state.quantity;

      this.setState({
        subTotal, unitPrice
      })
    }
    else{
      tellUser('Quantity should be a number')
      this.setState({
        subTotal: '',
        unitPrice: '',
      })
    }

  }

  render(){
    return (
      <div className="row SaleRow z-depth-1">
        <div className="col-md-3">
          <label>Particular</label>
          <input className="form-control" placeholder="Product/Service name or title" type="text"/>
        </div>
        <div className="col-md-2">
          <label>Quantity</label>
          <input onChange={(e) => { this.handleQuantity(e.target.value) }} value={this.state.quantity} className="form-control" placeholder="Quantity" type="number"/>
        </div>
        <div className="col-md-2">
          <label>Unit</label>
          <input className="form-control" placeholder="set, pcs, kg .." type="text"/>
        </div>
        <div className="col-md-2">
          <label>Unit Price</label>
          <input onChange={(e) => { this.handleUnitPrice(e.target.value) }} value={this.state.unitPrice} className="form-control" placeholder="Unit Price" type="number"/>
        </div>
        <div className="col-md-2">
          <label>Sub Total</label>
          <input readOnly={true} value={this.state.subTotal} className="form-control" placeholder="Sub Total" type="number"/>
        </div>
      </div>
    );
  }
}
