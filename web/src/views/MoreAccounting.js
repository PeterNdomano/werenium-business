import React, { Component } from 'react';
import { MdPerson, MdNavigateNext } from 'react-icons/md';
import MainIncome from '../views/MainIncome';


export default class MoreAccounting extends Component {
  openIncome = () => {
    this.props.openViewer(
      "Income Management",
      <MainIncome showDialog={this.props.showDialog}  business={this.props.business}/>
    );
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-6">

          <div className="mTab" onClick={() => this.openIncome()}>
            <div className="d-flex flex-row">
              <div className="align-self-center p-2">
                <MdPerson size={24} className=""/>
              </div>
              <div className="align-self-center p-2 flex-grow-1">
                <span>Income</span>
              </div>
              <div className="align-self-center p-2">
                <MdNavigateNext size={24} className=""/>
              </div>
            </div>
            <hr/>
          </div>

          <div className="mTab">
            <div className="d-flex flex-row">
              <div className="align-self-center p-2">
                <MdPerson size={24} className=""/>
              </div>
              <div className="align-self-center p-2 flex-grow-1">
                <span>Expenses</span>
              </div>
              <div className="align-self-center p-2">
                <MdNavigateNext size={24} className=""/>
              </div>
            </div>
            <hr/>
          </div>

          <div className="mTab">
            <div className="d-flex flex-row">
              <div className="align-self-center p-2">
                <MdPerson size={24} className=""/>
              </div>
              <div className="align-self-center p-2 flex-grow-1">
                <span>Financial Reports</span>
              </div>
              <div className="align-self-center p-2">
                <MdNavigateNext size={24} className=""/>
              </div>
            </div>
            <hr/>
          </div>
        </div>


        <div className="col-md-6">
          <div className="mTab">
            <div className="d-flex flex-row">
              <div className="align-self-center p-2">
                <MdPerson size={24} className=""/>
              </div>
              <div className="align-self-center p-2 flex-grow-1">
                <span>Accounts Receivable</span>
              </div>
              <div className="align-self-center p-2">
                <MdNavigateNext size={24} className=""/>
              </div>
            </div>
            <hr/>
          </div>

          <div className="mTab">
            <div className="d-flex flex-row">
              <div className="align-self-center p-2">
                <MdPerson size={24} className=""/>
              </div>
              <div className="align-self-center p-2 flex-grow-1">
                <span>Accounts Payable</span>
              </div>
              <div className="align-self-center p-2">
                <MdNavigateNext size={24} className=""/>
              </div>
            </div>
            <hr/>
          </div>

          <div className="mTab">
            <div className="d-flex flex-row">
              <div className="align-self-center p-2">
                <MdPerson size={24} className=""/>
              </div>
              <div className="align-self-center p-2 flex-grow-1">
                <span>Financial Analysis</span>
              </div>
              <div className="align-self-center p-2">
                <MdNavigateNext size={24} className=""/>
              </div>
            </div>
            <hr/>
          </div>

        </div>
      </div>
    )
  }
}