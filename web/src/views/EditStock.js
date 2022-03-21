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

export default class EditStock extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      item: props.item,
    }
  }

  edit = async () => {
    if(!this.state.loading){
      let title = $('#_title').val();
      let quantity = $('#_quantity').val();
      let unit = $('#_unit').val();
      let sPrice = $('#_sPrice').val();
      let bPrice = $('#_bPrice').val();
      if(validateStr(title)){
        if(validateStr(quantity) && !isNaN(quantity)){
          quantity = Number(quantity);
          if(validateStr(unit)){
            if(sPrice.trim().length === 0 || (validateStr(sPrice) && !isNaN(sPrice))){
              sPrice = Number(sPrice);
              if(bPrice.trim().length === 0 || (validateStr(bPrice) && !isNaN(bPrice))){
                bPrice = Number(bPrice);
                this.setState({ loading: true });

                await this.props.business.editStock(
                  {
                    id: this.props.item.id,
                    title,
                    quantity,
                    unit,
                    sPrice,
                    bPrice,
                  }
                ).then((result) => {
                  this.setState({ loading: false });
                  if(result === true){
                    this.props.getStock(true);
                    tellUser('Saving successful..');
                    $('#dialogCloser2').click();
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

  componentDidMount(){
    this.setState({
      item: this.props.item,
    })
  }

  UNSAFE_componentWillReceiveProps(props){
    this.setState({
      item: props.item,
    })
  }



  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <MDBInput onChange={(e) => { this.setState({ item: { title: e.target.value} }) }} id="_title" label="Title" value={this.state.item.title} />
            <MDBInput onChange={(e) => { this.setState({ item: { quantity: e.target.value} }) }} id="_quantity" label="Quantity" value={this.state.item.quantity}/>
            <MDBInput onChange={(e) => { this.setState({ item: { unit: e.target.value} }) }} id="_unit" label="Unit" value={this.state.item.unit}/>
          </div>
          <div className="col-md-6">
            <MDBInput onChange={(e) => { this.setState({ item: { bPrice: e.target.value} }) }} id="_bPrice" label="Buying Price" value={this.state.item.bPrice}/>
            <MDBInput onChange={(e) => { this.setState({ item: { sPrice: e.target.value} }) }} id="_sPrice" label="Selling Price" value={this.state.item.sPrice}/>

            <div className="text-right" style={{ width: "100%"}}>
              <button onClick={() => this.edit()} style={{ color: "var(--darkColor)"}} className="btn btn-warning">
                {
                  (this.state.loading) ?
                  getLoader() :
                  "Save Changes"
                }
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
