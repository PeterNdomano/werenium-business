import React, { Component } from 'react';
import { getLoader } from '../Helper';
import Home from '../body_divs/Home';
import Stock from '../body_divs/Stock';
import Sales from '../body_divs/Sales';
import Invoicing from '../body_divs/Invoicing';
import More from '../body_divs/More';

export default class MainBody extends Component{

  constructor(props){
    super(props);
    this.state = {
      showViewer: false,
      navTo: props.navTo,
    };
    this.initialize(props);
  }

  componentDidMount(){
    //this.initialize(this.props);
  }

  UNSAFE_componentWillReceiveProps(props){
    this.initialize(props)
    this.setState({
      navTo: props.navTo,
    })
  }

  setTitle = (props) => {
    if(this.state.showViewer){
      this.title = "view";
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
    if(this.state.showViewer){

    }
    else{
      switch(props.navTo){
        case "home":
          this.view = <Home/>;
          break;
        case "stock":
          this.view = <Stock business={props.business}/>;
          break;
        case "sales":
          this.view = <Sales/>;
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
    return (
      <div className="MainBody">
        <div className="mTitle z-depth-1">
          <div className="container">
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
