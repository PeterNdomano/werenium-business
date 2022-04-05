import React, { Component, Fragment } from 'react';
import { MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import ViewInvoice from '../views/ViewInvoice';
import EditSale from '../views/EditSale';
import { tellUser, thousandSeps, padNumber } from '../Helper';

export default class OneSale extends Component{

  constructor(props){
    super(props);
    this.state = {
      invoice: (props.invoice === undefined) ? false : props.invoice,
      proforma: (props.proforma === undefined) ? false : props.proforma,
    }
  }

  delete = () => {
    this.props.showDialog( async () => {
      await this.props.business.deleteSale(this.props.item).then((result) => {
        if(result === true){
          tellUser('Item was deleted');
          this.props.getSales(true);
        }
        else{
          tellUser('Deleting failed..');
        }
      })
    }, 'This sale item and its related accounts(debts, income etc..) will be deleted completely');
  }

  viewInvoice = () => {
    this.props.openViewer(
      "Viewing Invoice",
      <ViewInvoice item={this.props.item}  business={this.props.business}/>
    );
  }

  viewProforma = () => {
    this.props.openViewer(
      "Viewing Proforma",
      <ViewInvoice proforma={true} item={this.props.item}  business={this.props.business}/>
    );
  }

  editSale = () => {
    this.props.openViewer(
      "Editing Sale",
      <EditSale item={this.props.item}  business={this.props.business}/>
    );
  }

  render(){
    return (
      <div className="OneSale">
        <div className="mContainer text-left">
          <h6 className="mAmount">
            {thousandSeps(this.props.item.data.total)}
            <span style={{ fontSize:"14px" }}>
              &nbsp;&nbsp;
              {this.props.business.info.currency}
            </span>
          </h6>
          <h6 className="mTitle">
          {(this.props.item.data.customerName.trim().length > 0) ? this.props.item.data.customerName : <span>Customer Name N/A</span> }
          </h6>
          <h6 style={{ fontSize: "12px"}}>
            {"Date: "+this.props.item.date.getFullYear()+" / "+this.props.item.date.getMonth()+" / "+this.props.item.date.getDate()}
            ,&nbsp;&nbsp;
            {"ID: "+ padNumber(this.props.item.id)}
          </h6>
        </div>

        <div className="mContainer text-right">
          {
            ((this.state.invoice === false && this.state.proforma === false))
            ?
            <Fragment>
              <button onClick={() => this.editSale()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Edit">
                <MdEdit className="mIcon"/>
              </button>
              <button onClick={() => this.delete()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete">
                <MdDelete className="mIcon"/>
              </button>

              <button onClick={() => this.viewInvoice()} style={{ width:"100px", background:"var(--accentColor)", color:"var(--darkColor)"}} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="View">
                view invoice
              </button>
            </Fragment>
            :
            " "
          }


          {
            (this.state.invoice === true)
            ?
            <Fragment>
              <button onClick={() => this.viewInvoice()} style={{ width:"100px", background:"var(--accentColor)", color:"var(--darkColor)"}} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="View">
                View Invoice
              </button>
            </Fragment>
            :
            " "
          }

          {
            (this.state.proforma === true)
            ?
            <Fragment>
              <button onClick={() => this.viewProforma()} style={{ width:"100px", background:"var(--accentColor)", color:"var(--darkColor)"}} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="View">
                view Proforma
              </button>
            </Fragment>
            :
            " "
          }

        </div>

        <hr/>
      </div>
    )
  }
}
