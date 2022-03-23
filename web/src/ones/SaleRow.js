import React, { Component } from 'react';
import { tellUser } from '../Helper';
import { MdDelete } from 'react-icons/md';

export default class SaleRow extends Component{
  constructor(props){
    super(props);
    this.state = {
      unitPrice: (props.unitPrice) ? props.unitPrice : "",
      subTotal: (props.subTotal) ? props.subTotal : "",
      quantity: (props.quantity) ? props.quantity : "",
      particular: (props.particular) ? props.particular : "",
      unit: (props.unit) ? props.unit : "",
    }
  }

  test = () => {
    console.log('testing');
  }

  handleUnit = (unit) => {
    this.setState({
      unit
    }, () => {
      this.props.sumUp();
    })
  }

  handleParticular = (particular) => {
    this.setState({
      particular
    },  () => {
      this.props.sumUp();
    })
  }

  handleQuantity = (quantity) => {
    if(quantity.trim().length > 0 && !isNaN(quantity)){
      let subTotal = quantity * this.state.unitPrice;

      this.setState({
        subTotal, quantity
      },  () => {
        this.props.sumUp();
      })
    }
    else{
      tellUser('Quantity should be a number');
      this.setState({
        subTotal: '',
        quantity: '',
      }, () => {
        this.props.sumUp();
      })
    }

  }

  handleUnitPrice = (unitPrice) => {
    if(unitPrice.trim().length > 0 && !isNaN(unitPrice)){
      let subTotal = unitPrice * this.state.quantity;

      this.setState({
        subTotal, unitPrice
      }, () => {
        this.props.sumUp();
      })
    }
    else{
      tellUser('Quantity should be a number')
      this.setState({
        subTotal: '',
        unitPrice: '',
      }, () => {
        this.props.sumUp();
      })
    }

  }

  render(){
    return (
      <div className="row SaleRow z-depth-1">
        <div className="col-md-3">
          <label>Particular*</label>
          <input value={this.state.particular} onChange={(e) => this.handleParticular(e.target.value)} className="form-control" placeholder="Product/Service name or title" type="text"/>
        </div>
        <div className="col-md-2">
          <label>Quantity*</label>
          <input onChange={(e) => { this.handleQuantity(e.target.value) }} value={this.state.quantity} className="form-control" placeholder="Quantity" type="number"/>
        </div>
        <div className="col-md-2">
          <label>Unit</label>
          <input value={this.state.unit} onChange={(e) => this.handleUnit(e.target.value)} className="form-control" placeholder="set, pcs, kg .." type="text"/>
        </div>
        <div className="col-md-2">
          <label>Unit Price*</label>
          <input onChange={(e) => { this.handleUnitPrice(e.target.value) }} value={this.state.unitPrice} className="form-control" placeholder="Unit Price" type="number"/>
        </div>
        <div className="col-md-2">
          <label>Sub Total</label>
          <input readOnly={true} value={this.state.subTotal} className="form-control" placeholder="Sub Total" type="number"/>
        </div>
        <div className="col-md-1">
          <label>Delete</label>
          <button onClick={() => this.props.deleteRow(this.props.index)} className="btn btn-sm" style={{ padding:"0px", width:"100%", margin:"0px", background:"none", boxShadow:"none", paddingBottom:"5px", paddingTop:"5px" }}>
            <MdDelete size={20}/>
          </button>
        </div>
      </div>
    );
  }
}
