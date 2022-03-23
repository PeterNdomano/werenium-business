import  React, { Component } from 'react';
import ConfirmDialog from './components/ConfirmDialog';
import Dialog from './components/Dialog';
import Loader from './components/Loader';
import MainBody from './components/MainBody';
import MainLoader from './components/MainLoader';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import { hideLoader, tellUser } from './Helper';
import { connect } from './Models/Database';
import { createBusiness } from './Models/Business';
import $ from 'jquery';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      openNav: false,
      navTo: (props.navTo) ? props.navTo :"home",
      showLoader: true,
      showDialog: false,
      dbConnect: false,
      showViewer: false,
      viewerTitle: "",
      showDialogView: false,
    };

    this.view = null;

    this.ConfirmDialog = <ConfirmDialog
                            action=""
                            msg=""
                            showDialog={this.state.showDialog}
                          />
    this.Dialog = <Dialog
                        view={null}
                        title=""
                        showDialogView={this.state.showDialogView}
                      />
  }

  UNSAFE_componentWillReceiveProps(props){
    (async () => {
      await this.initialize();
      this.realNavTo(props.navTo);
    })();

  }

  closeViewer = () => {
    this.view = null;
    this.setState({
      showViewer: false,
      viewerTitle: "",
    });

  }

  openViewer = (title, view) => {
    this.view = view;
    this.setState({
      showViewer: true,
      viewerTitle: title,
    });
  }


  componentDidMount(){
    (async () => {
      await this.initialize();
    })();
    $('#dialog').on('show.bs.modal', function(e){
      alert('hidden');
    })
  }

  componentWillUnmount(){
    this.db.close();
  }

  initialize =  async () => {
    if(!this.state.dbConnect){
      this.db = await connect();
      this.business = await createBusiness(this.db);
      this.setState({
        dbConnect: true,
      })
      hideLoader();
    }
    else{
      hideLoader();
    }
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

  showDialogView = (view, title) => {
    this.Dialog = <Dialog
                        view={view}
                        title={title}
                        showDialogView={true}
                      />
    this.setState({
      showDialogView: true
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
      navTo,
      showViewer: false,
    });
  }

  navTo = (navTo) => {
    window.location.href = '/#/'+navTo;
    this.closeNav();
  }

  render(){
    if(this.state.dbConnect){
      return (
        <div>
          {this.ConfirmDialog}
          {this.Dialog}
          <MainLoader showLoader={this.state.showLoader}/>
          <TopBar toggleNavCallback={this.toggleNav}/>
          <NavBar navTo={this.state.navTo} navToCallback={this.navTo} closeNavCallback={this.closeNav} openNav={this.state.openNav}/>
          <MainBody showDialogView={this.showDialogView} viewerTitle={this.state.viewerTitle} showViewer={this.state.showViewer} view={this.view} closeViewer={this.closeViewer} openViewer={this.openViewer} showDialog={this.showDialog} navTo={this.state.navTo} business={this.business}/>
          <Footer/>
        </div>
      );
    }
    else{
      return (
        <div>
          <MainLoader showLoader={true}/>
        </div>
      );
    }

  }
}
