import React, { Component, Fragment } from 'react';
import { MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import ViewReceivable from '../views/ViewReceivable';
import EditSale from '../views/EditSale';
import { tellUser, thousandSeps } from '../Helper';

export default class OneIncome extends Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  delete = () => {
    this.props.showDialog( async () => {
      await this.props.business.deleteReceivableAccounts(this.props.item.id).then((result) => {
        if(result === true){
          tellUser('Item was deleted');
          this.props.reload();
        }
        else{
          tellUser('Deleting failed..');
        }
      })
    }, 'This item and all its related accounts(debts, income etc..) will be deleted completely');
  }



  view = () => {
    this.props.showDialogView(
      <ViewReceivable item={this.props.item}  business={this.props.business}/>,
      "Viewing Account Receivable"
    );
  }

  render(){
    return (
      <div className="OneSale">
        <div className="mContainer text-left">
          <h6 className="mAmount">
            {thousandSeps(this.props.item.amountDue)}
            <span style={{ fontSize:"14px" }}>
              &nbsp;&nbsp;
              {this.props.business.info.currency}
            </span>
          </h6>
          <h6 className="mTitle">
          {this.props.item.ref}
          </h6>
          <h5 style={{ fontSize: "16px"}}>
            {"Paid: "+this.props.item.amountPaid+" |  Unpaid:"+(Number(this.props.item.amountDue) - Number(this.props.item.amountPaid))}
          </h5>
          <h6 style={{ fontSize: "12px"}}>
            {"Date: "+this.props.item.date.getFullYear()+" / "+this.props.item.date.getMonth()+" / "+this.props.item.date.getDate()}
          </h6>
        </div>

        <div className="mContainer text-right">
          <button onClick={() => this.view()} className="btn btn-sm" style={{ width:"100px", background:"var(--darkColor)" }} data-toggle="tooltip" data-placement="bottom" title="Update Payment">
            Update Payment
          </button>
          <button onClick={() => this.view()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="View">
            <MdInfo className="mIcon"/>
          </button>
          <button onClick={() => this.delete()} className="btn btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete">
            <MdDelete className="mIcon"/>
          </button>
        </div>

        <hr/>
      </div>
    )
  }
}
