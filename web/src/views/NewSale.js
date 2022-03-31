import React, { Component, Fragment } from 'react';
import { MDBInput } from 'mdbreact';
import $ from 'jquery';
import { showLoader,
  hideLoader,
  getLoader,
  tellUser,
  validateNum,
  validateStr,
  thousandSeps,
} from '../Helper';
import SaleRow from '../ones/SaleRow';
import { MdAdd } from 'react-icons/md';

export default class NewSale extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      rowsChanged: false,
    }


    this.rowsData = [];
    this.total = 0;
    this.rows = [<SaleRow business={this.props.business} sumUp={this.sumUp} index={0} key={"_row"+0+"_"+Math.random()} deleteRow={this.deleteRow}/>];
  }

  componentDidMount(){

  }



  sumUp = () => {
    this.rowsData = [];
    let total = 0;
    let itemsContainer = document.getElementById('soldItems');
    for(let i = 0; i < itemsContainer.children.length; i++){
      let itemRow = itemsContainer.children[i];
      let particular = itemRow.children[0].children[1].value;
      let quantity = itemRow.children[1].children[1].value;
      let unit = itemRow.children[2].children[1].value;
      let unitPrice = itemRow.children[3].children[1].value;
      let subTotal = itemRow.children[4].children[1].value;
      total += Number(subTotal);
      this.rowsData.push({
        particular, quantity, unit, unitPrice, subTotal
      });
    }

    this.total = total;

    this.setState((prevState) => ({
      rowsChanged: !prevState.rowsChanged,
    }))
  }

  checkValidity = () => {
    if(this.rowsData.length > 0){
      for(let index = 0; index < this.rowsData.length; index++){
        let item = this.rowsData[index];
        if(item.particular.trim().length > 0){
          if(item.quantity.trim().length > 0){
            if(item.unitPrice.trim().length > 0){
              if(index === (this.rowsData.length - 1)){
                return true;
              }
            }
            else{
              tellUser('Write valid unit price for row '+(index+1));
              break;
            }
          }
          else{
            tellUser('Write valid quantity for row '+(index+1));
            break;
          }
        }
        else{
          tellUser('Write valid particular for row '+(index+1));
          break;
        }
      }
    }
    else{
      tellUser('Fill in some data in rows');
    }
    return false;
  }

  save = () => {
    if(!this.state.loading){
      if(this.checkValidity() === true){
        this.props.showDialog( async () => {
          let date = new Date($('#cDate').val());
          let customerName = $('#cName').val();
          let customerDetails = $('#cDetails').val();
          let amountPaid = $('#cAmountPaid').val();
          let proforma = (this.props.proforma === true) ? true : false;

          let data = {
            customerName,
            customerDetails,
            amountPaid,
            total: this.total,
            soldItems: this.rowsData,
          };

          if(amountPaid.trim().length > 0){
            if(!isNaN(Number(amountPaid))){
              if(!isNaN(date.getTime())){
                this.setState({ loading: true });
                await this.props.business.saveSale({
                  proforma,
                  date,
                  data,
                }).then((result) => {
                  if(result === true){
                    this.setState({ loading: false });
                    $('#viewerCloserBtn').click();
                    tellUser('Saving successful...');
                  }
                  else{
                    this.setState({ loading: false });
                    tellUser('Unknown error occured, contact support');
                  }
                })
              }
              else{
                tellUser('Invalid date');
              }

            }
            else{
              tellUser('Please specify valid amount paid by this customer');
            }
          }
          else{
            tellUser('Please specify amount paid by this customer');
          }


        }, 'This Sale will be recorded');
      }
    }
    else{
      tellUser('Please wait...');
    }

  }

  deleteRow = (index) => {
    this.rows.forEach((item, i) => {
      if(item.props.index === index){
        this.rows.splice(i, 1);
      }
    })
    this.setState((prevState) => ({
      rowsChanged: !prevState.rowsChanged,
    }))
  }

  addRow = () => {
    this.rows.push(<SaleRow business={this.props.business} sumUp={this.sumUp} index={this.rows.length} key={"_row"+this.rows.length+"_"+Math.random()} deleteRow={this.deleteRow}/>);
    this.setState((prevState) => ({
      rowsChanged: !prevState.rowsChanged,
    }))
  }


  render(){
    let date = new Date();
    let today = date.toISOString().substr(0, 10);
    let btnStr = (this.props.proforma === true) ? "Create Proforma" : "Record Sale";
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <MDBInput id="cName" label="Customer Name (Optional)" type="text"/>
              </div>
              <div className="col-md-6">
                <MDBInput id="cDetails" label="Customer Details eg Phone, Address (Optional)" type="text"/>
              </div>
              <div className="col-md-6">
                <MDBInput valueDefault={today} id="cDate" label="Date*" type="date"/>
              </div>

            </div>

            <div className="row">
              <div className="col-md-12" style={{ marginTop:"20px", marginBottom:"10px"}}>
                <h6 className="text-danger font-regular" style={{ fontSize:"12px" }}>
                  Fill in items/services sold to this customer below
                </h6>
              </div>
            </div>

            <div id="soldItems" style={{ width:"100%", paddingLeft:"15px", paddingRight:"15px"}}>
              {this.rows}
            </div>

            <div className="row">
              <div className="col-md-12 text-right" style={{ marginTop:"0px", marginBottom:"10px"}}>
                <button onClick={() => { this.addRow() }} className="btn btn-sm btn-dark text-light"><MdAdd size={12}/>Add Row</button>
              </div>
            </div>

            <hr/>

            <div className="row">
              <div className="col-md-6">
                <MDBInput id="cAmountPaid" valueDefault="0" label="Amount Paid By Customer Currently" type="number"/>
                <h6 className="text-danger font-regular" style={{ fontSize:"12px" }}>
                  If less than {thousandSeps(this.total)} is paid now this customer will be added to debts
                </h6>
              </div>

              <div className="col-md-6 text-right" style={{ marginTop:"20px", marginBottom:"10px"}}>
                <h3>{thousandSeps(this.total)} {this.props.business.info.currency}</h3>
                <h6 className="text-warning font-regular">Grand Total Due</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 text-left" style={{ marginTop:"30px", marginBottom:"10px", padding:"10px"}}>
                <button onClick={() => { this.save() }} className="btn btn-warning text-dark" >
                  {
                    (this.state.loading) ?
                    getLoader() : ''

                  }
                  {btnStr}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
