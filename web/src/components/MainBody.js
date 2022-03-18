import React, { Component } from 'react';
import { getLoader } from '../Helper';

export default class MainBody extends Component{

  constructor(props){
    super(props);
    this.state = {
      showViewer: false,
    };
    this.initialize(props);
  }

  componentDidMount(){
    //this.initialize(this.props);
  }

  UNSAFE_componentWillReceiveProps(props){
    this.initialize(props);
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
          this.title = "Stock";
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

  initialize = (props) => {
    //set title
    this.setTitle(props);
  }

  render(){
    return (
      <div className="MainBody">
        <div className="mTitle">
          <div className="container">
            <p>{this.title}</p>
          </div>
        </div>

        <div className="mContainer">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h3>{this.title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
