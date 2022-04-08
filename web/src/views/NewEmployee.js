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
      let fullname = $('#_eFullname').val();
      let phone = $('#_ePhone').val();
      let details = $('#_eDetails').val();


      if(fullname.trim().length > 0 && phone.trim().length > 0){
        let date = new Date();
        this.setState({
          loading: true,
        });
        let result = await this.props.business.saveEmployee({fullname, phone, details, date});

        if(result === true){
          tellUser('Employee was recorded');
          $('#_eFullname').val('');
          $('#_ePhone').val('');
          $('#_eDetails').val('');

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
        tellUser('Invalid fullname or phone');
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
              <label>Employee's Fullname</label>
              <input id="_eFullname" className="form-control" type="text"/>
            </div>
            <div className="form-group">
              <label>Employee's Phone Number</label>
              <input id="_ePhone" className="form-control" type="number"/>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Other Details (eg address, etc...)</label>
              <textarea id="_eDetails" rows={4} className="form-control"></textarea>
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
