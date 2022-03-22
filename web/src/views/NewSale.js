import React, { Component, Fragment } from 'react';
import { MDBInput } from 'mdbreact';
import $ from 'jquery';
import { showLoader,
  hideLoader,
  getLoader,
  tellUser,
  validateNum,
  validateStr,
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

    this.total = 0;
    this.rows = [<SaleRow index={0} key={"_row"+0} deleteRow={this.deleteRow}/>];
  }

  componentDidMount(){

  }

  deleteRow = (i) => {
    this.row.splice(i, 1);
    this.setState((prevState) => ({
      rowsChanged: !prevState.rowsChanged,
    }))
  }

  addRow = () => {
    this.rows.push(<SaleRow index={this.rows.length} key={"_row"+this.rows.length} deleteRow={this.deleteRow}/>);
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
                <h3>{this.total} {this.props.business.info.currency}</h3>
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
