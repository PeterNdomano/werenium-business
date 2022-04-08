import React, { Component } from 'react';
import { MdPerson, MdNavigateNext } from 'react-icons/md';
import MainCustomers from '../views/MainCustomers';


export default class MoreManagement extends Component {
  openCustomers = () => {
    this.props.openViewer(
      "Customers Management",
      <MainCustomers showDialog={this.props.showDialog}  business={this.props.business}/>
    );
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-6">

          <div className="mTab" onClick={() => this.openCustomers()}>
            <div className="d-flex flex-row">
              <div className="align-self-center p-2">
                <MdPerson size={24} className=""/>
              </div>
              <div className="align-self-center p-2 flex-grow-1">
                <span>Customers</span>
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
                <span>Employees</span>
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
                <span>Settings</span>
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
                <span>About Werenium Business</span>
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
                <span>Software License</span>
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
                <span>How to use Werenium Business</span>
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
