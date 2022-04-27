import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { MDBInput } from 'mdbreact';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader, tellUser, getStartIndex } from '../Helper';
import NewSale from '../views/NewSale';
import OneSale from '../ones/OneSale';
import $ from 'jquery';
import AddExpense from '../views/AddExpense';
import AllReceivables from '../views/AllReceivables';

export default class MainExpenses extends Component{

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

  newExpense = () => {
    this.props.showDialogView(<AddExpense reload={this.reload} business={this.props.business}/>, "Record Expenses");
  }

  render(){
    return (
      <div className="container Sales">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="card introCard bg-warning">
                  <div className="d-flex">
                    <div className="p-1 align-self-center">
                      <AiOutlineStock className="mIcon"/>
                    </div>
                    <div className="align-self-center flex-grow-1 text-right p-2">
                      <h1 id="_totalReceivablesDisplay">0</h1>
                      <h6>Total Amount To Be Received in {this.props.business.info['currency']}</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="card introCard bg-primary">
                  <div className="d-flex">
                    <div className="p-1 align-self-center">
                      <AiOutlineStock className="mIcon"/>
                    </div>
                    <div className="align-self-center flex-grow-1 text-right p-2">
                      <h1 id="_totalCollectedDisplay">0</h1>
                      <h6>Collected Amount</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="card introCard bg-danger">
                  <div className="d-flex">
                    <div className="p-1 align-self-center">
                      <AiOutlineStock className="mIcon"/>
                    </div>
                    <div className="align-self-center flex-grow-1 text-right p-2">
                      <h1 id="_totalUncollectedDisplay">0</h1>
                      <h6>Uncollected Amount</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="card introCard" style={{ cursor:"pointer" }}>
                  <button onClick={() => this.newExpense()} style={{ width:"100%", height:"100%", margin:"0px"}} className="btn btn-success">
                    <AiOutlineAppstoreAdd className="mIcon"/><br/>
                    <h6>New Receivable</h6>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="col-sm-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <AllReceivables reload={this.reload} showTotal={true} showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.props.openViewer} business={this.props.business}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
