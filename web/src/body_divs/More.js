import React, { Component } from 'react';
import { CgExtension } from 'react-icons/cg';
import { MDBInput } from 'mdbreact';
import { AiOutlineStock, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { numberFormat, getLoader, tellUser, getStartIndex } from '../Helper';
import MoreAccounting from '../views/MoreAccounting';
import MoreManagement from '../views/MoreManagement';
import NewSale from '../views/NewSale';
import $ from 'jquery';

export default class More extends Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }


  render(){
    return (
      <div className="container Invoicing">
        <div className="row">


          <div className="col-sm-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="tab-content" id="moreTabContent">
                  <div className="tab-pane fade show active" id="moreAccounting" role="tabpanel" aria-labelledby="accounting-tab">
                    <MoreAccounting showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.props.openViewer} business={this.props.business} />
                  </div>

                  <div className="tab-pane fade" id="moreManagement" role="tabpanel" aria-labelledby="management-tab">
                    <MoreManagement showDialogView={this.props.showDialogView} showDialog={this.props.showDialog} openViewer={this.props.openViewer} business={this.props.business} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
