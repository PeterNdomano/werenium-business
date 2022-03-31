import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { MDBInput } from 'mdbreact';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader, tellUser, getStartIndex } from '../Helper';
import AllInvoices from '../views/AllInvoices';
import AllProforma from '../views/AllProforma';
import NewSale from '../views/NewSale';
import $ from 'jquery';

export default class Invoicing extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  newSale = (proforma = false) => {
    if(proforma === true){
      this.props.openViewer(
        "Create New Proforma/Estimate",
        <NewSale proforma={true} showDialog={this.props.showDialog}  business={this.props.business}/>
      );
    }
    else{
      this.props.openViewer(
        "Record New Sale",
        <NewSale showDialog={this.props.showDialog}  business={this.props.business}/>
      );
    }
  }



  render(){
    return (
      <div className="container Invoicing">
        <div className="row">


          <div className="col-sm-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="tab-content" id="invoicingTabContent">
                  <div className="tab-pane fade show active" id="invInvoices" role="tabpanel" aria-labelledby="invoices-tab">
                    <AllInvoices showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.props.openViewer} business={this.props.business} />
                  </div>

                  <div className="tab-pane fade" id="invProforma" role="tabpanel" aria-labelledby="proforma-tab">
                    <AllProforma showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.props.openViewer} business={this.props.business} />
                  </div>

                  <div className="tab-pane fade" id="invCreate" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="card introCard" style={{ cursor:"pointer" }}>
                          <button onClick={() => this.newSale()} style={{ width:"100%", height:"100%", margin:"0px"}} className="btn btn-dark">
                            <AiOutlineAppstoreAdd className="mIcon"/><br/>
                            <h6>New Invoice</h6>
                          </button>
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-12">
                        <div className="card introCard" style={{ cursor:"pointer" }}>
                          <button onClick={() => this.newSale(true)} style={{ width:"100%", height:"100%", margin:"0px"}} className="btn btn-warning text-dark">
                            <AiOutlineAppstoreAdd color="black" className="mIcon"/><br/>
                            <h6>New Proforma</h6>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
