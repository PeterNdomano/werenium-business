import React, { Component, Fragment } from 'react';
import { MDBInput } from 'mdbreact';
import $ from 'jquery';
import { showLoader,
  hideLoader,
  getLoader,
  tellUser,
  validateNum,
  validateStr,
  thousandSeps,
} from '../Helper';
import SaleRow from '../ones/SaleRow';
import { MdAdd } from 'react-icons/md';

export default class NewSale extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      rowsChanged: false,
    }

    this.rowsData = [];
    this.total = 0;
    this.rows = [<SaleRow sumUp={this.sumUp} index={0} key={"_row"+0+"_"+Math.random()} deleteRow={this.deleteRow}/>];
  }

  componentDidMount(){

  }

  sumUp = () => {
    this.rowsData = [];
    let total = 0;
    let itemsContainer = document.getElementById('soldItems');
    for(let i = 0; i < itemsContainer.children.length; i++){
      let itemRow = itemsContainer.children[i];
      let particular = itemRow.children[0].children[1].value;
      let quantity = itemRow.children[1].children[1].value;
      let unit = itemRow.children[2].children[1].value;
      let unitPrice = itemRow.children[3].children[1].value;
      let subTotal = itemRow.children[4].children[1].value;
      total += Number(subTotal);
      this.rowsData.push({
        particular, quantity, unit, unitPrice, subTotal
      });
    }

    this.total = total;

    this.setState((prevState) => ({
      rowsChanged: !prevState.rowsChanged,
    }))
  }

  deleteRow = (index) => {
    this.rows.forEach((item, i) => {
      if(item.props.index === index){
        this.rows.splice(i, 1);
      }
    })
    this.setState((prevState) => ({
      rowsChanged: !prevState.rowsChanged,
    }))
  }

  addRow = () => {
    this.rows.push(<SaleRow sumUp={this.sumUp} index={this.rows.length} key={"_row"+this.rows.length+"_"+Math.random()} deleteRow={this.deleteRow}/>);
    this.setState((prevState) => ({
      rowsChanged: !prevState.rowsChanged,
    }))
  }


  render(){
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <MDBInput id="cName" label="Customer Name (Optional)" type="text"/>
              </div>
              <div className="col-md-6">
                <MDBInput id="cDetails" label="Customer Details eg Phone, Address (Optional)" type="text"/>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12" style={{ marginTop:"20px", marginBottom:"10px"}}>
                <h6>Fill in items sold to this customer below</h6>
              </div>
            </div>

            <div id="soldItems" style={{ width:"100%", paddingLeft:"15px", paddingRight:"15px"}}>
              {this.rows}
            </div>

            <div className="row">
              <div className="col-md-12 text-right" style={{ marginTop:"0px", marginBottom:"10px"}}>
                <button onClick={() => { this.addRow() }} className="btn btn-sm btn-dark text-light"><MdAdd size={12}/>Add Row</button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 text-right" style={{ marginTop:"20px", marginBottom:"10px"}}>
                <hr/>
                <h3>{thousandSeps(this.total)} {this.props.business.info.currency}</h3>
                <h6 className="text-warning font-regular">Grand Total</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 text-left" style={{ marginTop:"10px", marginBottom:"10px"}}>
                <button onClick={() => { this.save() }} className="btn btn-warning text-dark">Record Sale</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
