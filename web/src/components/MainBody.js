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
      this.title = props.viewerTitle;
    }
    else{
      switch(props.navTo){
        case "home":
          this.title = "Home";
          break;
        case "stock":
          this.title = "Stock Management";
          break;
        case "sales":
          this.title = "Sales";
          break;
        case "invoicing":
          this.title = "Invoicing";
          break;
        case "more":
          this.title = "More Tools";
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
          this.view = <Invoicing/>;
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
              <div style={{ cursor:"pointer" }} onClick={() => this.closeViewer()} className="align-self-center">
                <MdOutlineArrowBack size={30}/>
                &nbsp;&nbsp;&nbsp;
              </div>
              : " "
            }
            <p>{this.title}</p>
          </div>
        </div>

        <div className="mContainer">
          {this.view}
        </div>
      </div>
    );
  }
}
