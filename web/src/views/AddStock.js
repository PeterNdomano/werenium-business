import React, { Component } from 'react';
import { MDBInput } from 'mdbreact';
import $ from 'jquery';
import { showLoader,
  hideLoader,
  getLoader,
  tellUser,
  validateNum,
  validateStr,
} from '../Helper';

export default class AddStock extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: false,
    }
  }

  addStock = async () => {
    if(!this.state.loading){
      let title = $('#title').val();
      let quantity = $('#quantity').val();
      let unit = $('#unit').val();
      let sPrice = $('#sPrice').val();
      let bPrice = $('#bPrice').val();

      if(validateStr(title)){
        if(validateStr(quantity) && !isNaN(quantity)){
          quantity = Number(quantity);
          if(validateStr(unit)){
            if(sPrice.trim().length === 0 || (validateStr(sPrice) && !isNaN(sPrice))){
              sPrice = Number(sPrice);
              if(bPrice.trim().length === 0 || (validateStr(bPrice) && !isNaN(bPrice))){
                bPrice = Number(bPrice);
                this.setState({ loading: true });

                await this.props.business.saveStock({
                  title,
                  quantity,
                  unit,
                  sPrice,
                  bPrice,
                  date: new Date(),
                }).then((result) => {
                  this.setState({ loading: false });
                  if(result === true){
                    $('#viewerCloserBtn').click();
                    tellUser('Saving successful..');
                  }
                  else{
                    tellUser('Error occured, please contact support.');
                  }
                });
              }
              else{
                tellUser('Invalid buying price..');
              }
            }
            else{
              tellUser('Invalid Selling price..');
            }
          }
          else{
            tellUser('Invalid unit..');
          }
        }
        else{
          tellUser('Invalid quantity..');
        }
      }
      else{
        tellUser('Invalid title..');
      }

    }
    else{
      tellUser('Please wait....');
    }

  }
  render(){
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <MDBInput id="title" label="Title*" type="text"/>
                <MDBInput id="quantity" label="Quantity*" type="number"/>
                <MDBInput id="unit" label="Unit* (pieces, sets, Kg, etc..)" type="text"/>
              </div>
              <div className="col-md-6">
                <MDBInput id="bPrice" label="Buying Price Per 1 Unit  (Optional)" type="number"/>
                <MDBInput id="sPrice" label="Selling Price Per 1 unit (Optional)" type="number"/>

                <div className="text-right" style={{ width: "100%"}}>
                  <button onClick={() => this.addStock()} style={{ color: "var(--darkColor)"}} className="btn btn-warning">
                    {
                      (this.state.loading) ?
                      getLoader() :
                      "Save Item"
                    }
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
