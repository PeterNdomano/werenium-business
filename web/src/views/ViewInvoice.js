import React, { Component, Fragment } from 'react';
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
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { MdPrint, MdPictureAsPdf } from 'react-icons/md';

export default class ViewStock extends Component{

  constructor(props){
    super(props);
    this.soldItems = '';
    this.state = {
      processed: false,
    }
  }

  componentDidMount(){
    this.soldItems = this.props.item.data.soldItems.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.particular}</td>
          <td>{item.unit}</td>
          <td>{item.quantity}</td>
          <td>{thousandSeps(item.unitPrice)}</td>
          <td>{thousandSeps(item.subTotal)}</td>
        </tr>
      )
    });

    this.setState((prevState) => {
      return {
        processed: !prevState.processed
      }
    })
  }

  print = () => {
    $("#invoiceViewer").show();
    window.print();
  }

  export = () => {
    $("#invoiceViewer").show();
    window.print();
  }

  render(){
    return (
      <div className="container InvoiceViewer" id="invoiceViewer">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 text-right">
                <button onClick={this.print} className="btn btn-primary text-dark btn-sm"> <MdPrint size={24}/> Print</button>
                <button onClick={this.export} className="btn btn-warning text-dark btn-sm"> <MdPictureAsPdf size={24}/> Export</button>
              </div>
              <div className="col-md-12" style={{ marginTop:"20px", marginBottom:"20px" }}>
                <h2>
                {
                  (this.props.proforma === true)
                  ?
                  "Proforma/Estimate"
                  :
                  "Invoice"
                }
                </h2>
              </div>
              <div className="col-md-6">
                <blockquote>
                  <h4>{this.props.business.info.name}</h4>
                  <h6>TIN: <b>{this.props.business.info.TIN}</b></h6>
                </blockquote>
              </div>
              <div className="col-md-6">
                <blockquote>
                  {
                    (this.props.item.data.customerName.trim().length > 0)
                    ?
                    <Fragment>
                      <h5>{this.props.item.data.customerName}</h5>
                      <h5>{this.props.item.data.customerDetails}</h5>
                    </Fragment>
                    :
                    " "
                  }
                </blockquote>
              </div>
              <div className="col-md-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Particular</th>
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.soldItems}
                  </tbody>
                </table>
              </div>

              <div className="col-md-6 text-left"></div>
              <div className="col-md-6 text-left" style={{ paddingTop:"30px"}}>
                <hr/>
                <h6>Total</h6>
                <h3>{thousandSeps(this.props.item.data.total)}</h3>
                <h6 style={{ fontSize:"16px", color:"var(--accentColor)", fontFamily:"OpenSansBold", marginTop:"-10px"}}>{this.props.business.info.currency}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
