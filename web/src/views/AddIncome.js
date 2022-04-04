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

export default class AddIncome extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: false,
    }
  }

  save = async () => {
    if(this.state.loading === false){
      let description = $('#_description').val();
      let amount = $('#_amount').val();
      let date = $('#_date').val();
      date = new Date(date);

      if(description.trim().length >  0){
        if(amount.trim().length > 0 && !isNaN(Number(amount))){
          amount = Number(amount);
          if(!isNaN(date.getTime())){
            this.setState({
              loading: true,
            });
            let result = await this.props.business.saveIncome({ description, amount, date });
            if(result === true){
              //success
              $('#_description').val('');
              $('#_amount').val('');
              tellUser('Saved successfully...');
              this.setState({
                loading: false,
              });
              $('#dialogCloser2').click()
            }
            else{
              tellUser('Unkown error occured, contact support');
              this.setState({
                loading: false,
              });
            }
          }
          else{
            tellUser('Invalid date');
          }
        }
        else{
          tellUser('Invalid amount');
        }
      }
      else{
        tellUser('Invalid description');
      }
    }
    else{
      tellUser('Please wait....');
    }
  }

  render(){
    let date = new Date();
    let today = date.toISOString().substr(0, 10);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Description</label>
              <textarea id="_description" rows={4} className="form-control"></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Date</label>
              <input type="date" id="_date" defaultValue={today} className="form-control"/>
            </div>

            <div className="form-group">
              <label>Amount in {this.props.business.info.currency}</label>
              <input id="_amount" className="form-control" type="number"/>
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
