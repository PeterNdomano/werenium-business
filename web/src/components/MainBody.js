import React, { Component } from 'react';
import { getLoader } from '../Helper';
import Home from '../body_divs/Home';
import Stock from '../body_divs/Stock';
import Sales from '../body_divs/Sales';
import Invoicing from '../body_divs/Invoicing';
import More from '../body_divs/More';
import { MdOutlineArrowBack } from  'react-icons/md';
import $ from 'jquery';

export default class MainBody extends Component{

  constructor(props){
    super(props);
    this.state = {
      navTo: props.navTo,
    };
    this.initialize(props);

  }

  componentDidMount(){
    //this.initialize(this.props);
  }

  componentWillUnmount(){

  }

  UNSAFE_componentWillReceiveProps(props){
    this.initialize(props)
  }

  closeViewer = () => {
    this.props.closeViewer();
  }

  openViewer = (title, view) => {
    this.props.openViewer(title, view);
  }

  setTitle = (props) => {
    if(props.showViewer){
      this.title = <p>{props.viewerTitle}</p>;
    }
    else{
      switch(props.navTo){
        case "home":
          this.title = <p>Home</p>;
          break;
        case "stock":
          this.title = <p>Stock Management</p>;
          break;
        case "sales":
          this.title = <p>Sales</p>;
          break;
        case "invoicing":
          this.title = (
            <ul className="nav nav-pills nav-justified" id="invoicingTab" role="tablist" style={{ width:"100%" }}>
              <li className="nav-item">
                <a className="nav-link active" id="invoices-tab" data-toggle="tab" href="#invInvoices" role="tab" aria-controls="home" aria-selected="true">Invoices</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="proforma-tab" data-toggle="tab" href="#invProforma" role="tab" aria-controls="profile" aria-selected="false">Proforma</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="create-tab" data-toggle="tab" href="#invCreate" role="tab" aria-controls="contact" aria-selected="false">Create</a>
              </li>
            </ul>
          );
          break;
        case "more":
          this.title = <p>More Tools</p>;
          break;
        default:
          this.title = "";
          break;
      }
    }
  }

  setView = (props) => {
    //console.log(props.business);
    if(props.showViewer){
      this.view = props.view;
    }
    else{
      switch(props.navTo){
        case "home":
          this.view = <Home/>;
          break;
        case "stock":
          this.view = <Stock showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.openViewer} business={props.business}/>;
          break;
        case "sales":
          this.view = <Sales showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.openViewer} business={props.business}/>;
          break;
        case "invoicing":
          this.view = <Invoicing showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.openViewer} business={props.business}/>;
          break;
        case "more":
          this.view = <More/>;
          break;
        default:
          this.view = <div></div>;
          break;
      }
    }
  }

  initialize = (props) => {
    //set title
    this.setTitle(props);
    //set view
    this.setView(props);
  }

  render(){
    //$("html, body").animate({ scrollTop: 0 }, "slow");

    return (
      <div className="MainBody">
        <div className="mTitle z-depth-1">
          <div className="container d-flex">
            {
              (this.props.showViewer) ?
              <div id="viewerCloserBtn" style={{ cursor:"pointer" }} onClick={() => this.closeViewer()} className="align-self-center">
                <MdOutlineArrowBack size={30}/>
                &nbsp;&nbsp;&nbsp;
              </div>
              : " "
            }
            {this.title}
          </div>
        </div>

        <div className="mContainer">
          {this.view}
        </div>
      </div>
    );
  }
}
