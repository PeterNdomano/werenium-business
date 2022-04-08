import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { MDBInput } from 'mdbreact';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader, tellUser, getStartIndex } from '../Helper';
import NewSale from '../views/NewSale';
import OneSale from '../ones/OneSale';
import $ from 'jquery';
import NewCustomer from '../views/NewCustomer';
import AllCustomers from '../views/AllCustomers';

export default class MainCustomers extends Component{

  constructor(props){
    super(props);
    this.state = {
      reload: false,
    }
  }

  componentDidMount(){

  }

  reload = () => {
    this.setState((prevState) => {
      return {
        reload: !prevState.reload,
      }
    })
  }

  newCustomer = () => {
    this.props.showDialogView(<NewCustomer reload={this.reload} business={this.props.business}/>, "Record New Customer");
  }

  render(){
    return (
      <div className="container Sales">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="row">

              <div className="col-md-6 col-sm-12">
                <div className="card introCard bg-warning">
                  <div className="d-flex">
                    <div className="p-1 align-self-center">
                      <AiOutlineStock className="mIcon"/>
                    </div>
                    <div className="align-self-center flex-grow-1 text-right p-2">
                      <h1 id="_totalCustomersDisplay">0</h1>
                      <h6>Total Customers</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="card introCard" style={{ cursor:"pointer" }}>
                  <button onClick={() => this.newCustomer()} style={{ width:"100%", height:"100%", margin:"0px"}} className="btn btn-success">
                    <AiOutlineAppstoreAdd className="mIcon"/><br/>
                    <h6>Record New Customer</h6>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="col-sm-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <AllCustomers reload={this.reload} showTotal={true} showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.props.openViewer} business={this.props.business}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
