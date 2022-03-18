import React, { Component } from 'react';
import werenium_logo from '../logos/werenium_logo.png';
import { MdHome } from 'react-icons/md';


export default class NavBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      navTo: props.navTo,
    }

    this.setMenu(props);

  }

  componentDidMount(){
    this.setMenu(this.props);
    //alert(this.state.navTo)
  }

  UNSAFE_componentWillReceiveProps(props){
    this.setMenu(props)
  }

  navTo = (navTo) => {
    this.setState({
      navTo
    }, () => {
      this.setMenu(this.props);
      this.props.navToCallback(navTo);
    });
  }

  setMenu = (props) => {
    //console.log(props);
    this.menu = (
      <div className="mContainer">

        <div onClick={() => this.navTo("home")} className={(props.navTo === "home") ? "mItem selected d-flex" : "mItem d-flex"}>
          <div className="align-self-center p-1">
            <MdHome className="mIcon"/>
          </div>
          <div className="align-self-center p-1">
            <p className="mTitle">Home</p>
          </div>
        </div>

        <div onClick={() => this.navTo("stock")} className={(props.navTo === "stock") ? "mItem selected d-flex" : "mItem d-flex"}>
          <div className="align-self-center p-1">
            <MdHome className="mIcon"/>
          </div>
          <div className="align-self-center p-1">
            <p className="mTitle">Stock</p>
          </div>
        </div>

        <div onClick={() => this.navTo("sales")} className={(props.navTo === "sales") ? "mItem selected d-flex" : "mItem d-flex"}>
          <div className="align-self-center p-1">
            <MdHome className="mIcon"/>
          </div>
          <div className="align-self-center p-1">
            <p className="mTitle">Sales</p>
          </div>
        </div>



        <div onClick={() => this.navTo("invoicing")} className={(props.navTo === "invoicing") ? "mItem selected d-flex" : "mItem d-flex"}>
          <div className="align-self-center p-1">
            <MdHome className="mIcon"/>
          </div>
          <div className="align-self-center p-1">
            <p className="mTitle">Invoicing</p>
          </div>
        </div>

        <div onClick={() => this.navTo("more")} className={(props.navTo === "more") ? "mItem selected d-flex" : "mItem d-flex"}>
          <div className="align-self-center p-1">
            <MdHome className="mIcon"/>
          </div>
          <div className="align-self-center p-1">
            <p className="mTitle">More Tools</p>
          </div>
        </div>

        <div className="mImage text-center">
          <img src={werenium_logo}/>
        </div>
      </div>
    );
  }

  renderOpen(){
    return (
      <div>
        <div className="NavPaper NavPaper-Open" id="navPaper" onClick={this.props.closeNavCallback}></div>
        <div className="NavBar z-depth-1-half " id="navBar">
          {this.menu}
        </div>
      </div>
    );
  }

  renderClose(){
    return (
      <div>
        <div className="NavPaper" id="navPaper" onClick={this.props.closeNavCallback}></div>
        <div className="NavBar NavBar-Close z-depth-1-half " id="navBar">
          {this.menu}
        </div>
      </div>
    );
  }

  render(){
    if(this.props.openNav){
      return this.renderOpen();
    }
    else{
      return this.renderClose();
    }
  }
}
