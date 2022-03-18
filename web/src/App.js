import  React, { Component } from 'react';
import ConfirmDialog from './components/ConfirmDialog';
import Loader from './components/Loader';
import MainBody from './components/MainBody';
import MainLoader from './components/MainLoader';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import { hideLoader, tellUser } from './Helper';
import { connect } from './Models/Database';
import { createBusiness } from './Models/Business';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      openNav: false,
      navTo: (props.navTo) ? props.navTo :"home",
      showLoader: true,
      showDialog: false,
    };

    this.ConfirmDialog = <ConfirmDialog
                            action=""
                            msg=""
                            showDialog={this.state.showDialog}
                          />
  }

  UNSAFE_componentWillReceiveProps(props){
    this.realNavTo(props.navTo);
  }


  componentDidMount(){
    (async () => {
      if(!this.db){
        this.db = await connect();
        this.business = await createBusiness(this.db);
      }
      hideLoader();
    })();
  }

  componentWillUnmount(){
    this.db.close();
  }


  showDialog = (action, msg) => {
    this.ConfirmDialog = <ConfirmDialog
                            action={action}
                            msg={msg}
                            showDialog={true}
                          />
    this.setState({
      showDialog: true
    });
  }

  toggleNav = () => {
    if(this.state.openNav){
      this.closeNav();
    }
    else{
      this.openNav();
    }
  }

  openNav = () => {
    this.setState({
      openNav: true
    });
  }

  closeNav = () => {
    this.setState({
      openNav: false
    });
  }

  realNavTo = (navTo) => {
    this.setState({
      navTo
    });
  }

  navTo = (navTo) => {
    window.location.href = '/#/'+navTo;
    this.closeNav();
  }

  render(){
    return (
      <div>
        {this.ConfirmDialog}
        <MainLoader showLoader={this.state.showLoader}/>
        <TopBar toggleNavCallback={this.toggleNav}/>
        <NavBar navTo={this.state.navTo} navToCallback={this.navTo} closeNavCallback={this.closeNav} openNav={this.state.openNav}/>
        <MainBody navTo={this.state.navTo}/>
        <Footer/>
      </div>
    );
  }
}
