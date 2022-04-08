import React, { Component } from 'react';
import { MDBInput } from 'mdbreact';
import $ from 'jquery';
import { showLoader,
  hideLoader,
  getLoader,
  tellUser,
  validateNum,
  validateStr,
  numberFormat,
} from '../Helper';

export default class NewCustomer extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: false,
    }
  }

  save = async () => {
    if(this.state.loading === false){
      let name = $('#_name').val();
      let details = $('#_details').val();

      if(name.trim().length > 0 && details.trim().length > 0){
        let date = new Date();
        this.setState({
          loading: true,
        });
        let result = await this.props.business.saveCustomer({name, details, date});

        if(result === true){
          tellUser('Customer was recorded');
          $('#_name').val('');
          $('#_details').val('');
          this.props.reload();
          $('#dialogCloser2').click();
        }
        else{
          tellUser('Could not add customer');
          tellUser('Contact support if this error persists');
        }
        this.setState({
          loading: false,
        });
      }
      else{
        tellUser('Invalid name or details');
      }
    }
    else{
      tellUser('Please wait....');
    }
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Customer Name</label>
              <input id="_name" className="form-control" type="text"/>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Customer Details (eg address, phone etc...)</label>
              <textarea id="_details" rows={4} className="form-control"></textarea>
            </div>
          </div>

          <div className="col-md-12 text-right" style={{ padding:"10px" }}>
            <button onClick={() => { $('#dialogCloser2').click() }} className="btn btn-dark text-light btn-sm">Close</button>
            <button onClick={() => { this.save() }} className="btn btn-warning text-dark btn-sm">
              {
                (this.state.loading) ?
                getLoader() : 'Save'

              }
            </button>
          </div>
        </div>
      </div>
    );
  }
}
