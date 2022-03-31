import React, { Component } from 'react';
import { MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import ViewInvoice from '../views/ViewInvoice';
import EditSale from '../views/EditSale';
import { tellUser, thousandSeps } from '../Helper';

export default class OneSale extends Component{

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
    }, 'This sale item and its related accounts(debts etc..) will be deleted completely');
  }

  viewInvoice = () => {
    this.props.openViewer(
      "Viewing Invoice",
      <ViewInvoice item={this.props.item}  business={this.props.business}/>
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
            {"ID: "+ this.props.item.id+"-"+this.props.item.date.getTime()}
          </h6>
        </div>

        <div className="mContainer text-right">
          <button onClick={() => this.editSale()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Edit">
            <MdEdit className="mIcon"/>
          </button>
          <button onClick={() => this.delete()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete">
            <MdDelete className="mIcon"/>
          </button>

          <button onClick={() => this.viewInvoice()} style={{ width:"100px", background:"var(--accentColor)", color:"var(--darkColor)"}} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="View">
            view invoice
          </button>

        </div>

        <hr/>
      </div>
    )
  }
}
