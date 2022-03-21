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
      item: {},
    }
  }

  edit = async () => {
    if(!this.state.loading){
      let title = document.getElementById("_title").innerText;
      let quantity = document.getElementById("_quantity").innerText;
      let unit = document.getElementById("_unit").innerText;
      let sPrice = document.getElementById("_sPrice").innerText;
      let bPrice = document.getElementById("_bPrice").innerText;

      alert(title);
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
          <div className="col-md-12">
            <h6 style={{ fontFamily:"OpenSansRegular", marginBottom:"40px" }} className="text-danger"><b>Click on item to edit it</b></h6>
          </div>
          <div className="col-md-6">
            <h6 style={{ fontFamily:"OpenSansRegular" }} className="text-primary"><b>Title</b></h6>
            <h4 style={{ marginBottom:"30px" }} className="mEditable" contentEditable={true} id="_title">{this.state.item.title}</h4>

            <h6 style={{ fontFamily:"OpenSansRegular" }} className="text-primary"><b>Quantity</b></h6>
            <h4 style={{ marginBottom:"30px" }} className="mEditable" contentEditable={true} id="_quantity">{this.state.item.quantity}</h4>

            <h6 style={{ fontFamily:"OpenSansRegular" }} className="text-primary"><b>Unit</b></h6>
            <h4 style={{ marginBottom:"30px" }} className="mEditable" contentEditable={true} id="_unit">{this.state.item.unit}</h4>
          </div>
          <div className="col-md-6">

            <h6 style={{ fontFamily:"OpenSansRegular" }} className="text-primary"><b>Buying Price</b></h6>
            <h4 style={{ marginBottom:"30px" }} className="mEditable" contentEditable={true} id="_bPrice">{this.state.item.bPrice}</h4>

            <h6 style={{ fontFamily:"OpenSansRegular" }} className="text-primary"><b>Selling Price</b></h6>
            <h4 style={{ marginBottom:"30px" }} className="mEditable" contentEditable={true} id="_sPrice">{this.state.item.sPrice}</h4>


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
